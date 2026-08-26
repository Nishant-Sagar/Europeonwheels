import { useState, useEffect } from 'react'
import axios from 'axios'
import { postJson } from '../lib/apiClient'

const API_ORIGIN = import.meta.env.VITE_API_URL || ''
const BASE_URL = `${API_ORIGIN}/api`

export function useApi(endpoint, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BASE_URL}${endpoint}`, { params })
      .then((res) => { setData(res.data); setError(null) })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [endpoint, JSON.stringify(params)])

  return { data, loading, error }
}

export const api = {
  // Routed through postJson so the contact and newsletter forms get the same
  // cold-start retries as the enquiry forms. Kept in axios's { data } shape so
  // existing callers do not have to change.
  post: async (endpoint, body, options) => ({
    data: await postJson(endpoint, body, options),
  }),
}
