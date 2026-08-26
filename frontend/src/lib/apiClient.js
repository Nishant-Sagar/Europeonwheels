/**
 * POST helper that survives a cold backend.
 *
 * The API runs on Render's free tier, which spins the instance down after ~15
 * minutes of no traffic. The next request then has to wait out a 30-60s boot,
 * which is longer than the proxy in front of it is willing to hold the
 * connection — so a visitor who submitted an enquiry into a sleeping backend
 * used to just get "Something went wrong" and we lost the lead.
 *
 * So: give up on a single attempt quickly, then retry across a budget long
 * enough to cover a full cold boot, and let the caller show a friendlier
 * message while that happens.
 */

const API_ORIGIN = import.meta.env.VITE_API_URL || ''

const ATTEMPT_TIMEOUT_MS = 20_000 // a warm backend answers in <1s
const RETRY_DELAY_MS = 2_500
const TOTAL_BUDGET_MS = 100_000 // comfortably covers a Render cold start

// Statuses that mean "the backend isn't up yet" rather than "your data is bad".
// 4xx is never retried — a validation error will not fix itself.
const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function newIdempotencyKey() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `k-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * @param {string} path      API path beginning with "/", e.g. "/enquiries/"
 * @param {object} body      JSON-serialisable payload
 * @param {object} [options]
 * @param {() => void} [options.onSlow]  Called once, when the first attempt
 *   fails and we start retrying — use it to show a "waking up" message.
 * @returns {Promise<any>} the parsed JSON response body
 * @throws {Error} if every attempt inside the budget fails
 */
export async function postJson(path, body, { onSlow } = {}) {
  const url = `${API_ORIGIN}/api${path}`
  // Stable across retries, so a request that landed but whose response we never
  // saw is not turned into a duplicate enquiry.
  const idempotencyKey = newIdempotencyKey()
  const startedAt = Date.now()

  let attempt = 0
  let lastError = new Error('Request failed')
  let warned = false

  while (Date.now() - startedAt < TOTAL_BUDGET_MS) {
    attempt += 1

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS)

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      if (res.ok) return await res.json()

      if (!RETRYABLE_STATUS.has(res.status)) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      lastError = new Error(`Server returned ${res.status}`)
    } catch (err) {
      // A non-retryable status above is rethrown as-is; anything else here is a
      // network failure or our own abort, both of which are worth another go.
      if (err instanceof Error && err.message.startsWith('Request failed with status')) {
        clearTimeout(timer)
        throw err
      }
      lastError = err instanceof Error ? err : new Error(String(err))
    } finally {
      clearTimeout(timer)
    }

    if (!warned) {
      warned = true
      onSlow?.()
    }

    if (Date.now() - startedAt + RETRY_DELAY_MS >= TOTAL_BUDGET_MS) break
    await sleep(RETRY_DELAY_MS)
  }

  lastError.attempts = attempt
  throw lastError
}
