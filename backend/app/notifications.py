import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
NOTIFY_EMAIL   = os.getenv("NOTIFY_EMAIL")
WHATSAPP_PHONE = os.getenv("WHATSAPP_PHONE")
GREEN_API_INSTANCE = os.getenv("GREEN_API_INSTANCE")
GREEN_API_TOKEN    = os.getenv("GREEN_API_TOKEN")

EMAIL_CONFIGURED    = bool(RESEND_API_KEY and NOTIFY_EMAIL)
WHATSAPP_CONFIGURED = bool(WHATSAPP_PHONE and GREEN_API_INSTANCE and GREEN_API_TOKEN)

# A notification is often the only lasting copy of a lead, so a single flaky
# call to Resend or Green API should not be the end of it.
_ATTEMPTS = 3
_BACKOFF_SECONDS = (1, 2)


class PermanentNotificationError(Exception):
    """A failure that retrying cannot fix — bad or expired credentials."""


def _with_retry(label: str, send) -> bool:
    """Run `send` up to _ATTEMPTS times. Returns True on the first success."""
    for attempt in range(1, _ATTEMPTS + 1):
        try:
            send()
            print(f"[notify] {label} sent (attempt {attempt})", flush=True)
            return True
        except PermanentNotificationError as e:
            # Retrying a rejected credential just adds seconds to every single
            # form submission, so stop after the first one.
            print(f"[notify] {label} FAILED permanently: {e} — check the credentials.",
                  flush=True)
            return False
        except Exception as e:  # noqa: BLE001
            print(f"[notify] {label} attempt {attempt}/{_ATTEMPTS} failed: {e}", flush=True)
            if attempt < _ATTEMPTS:
                time.sleep(_BACKOFF_SECONDS[attempt - 1])
    print(f"[notify] {label} FAILED after {_ATTEMPTS} attempts", flush=True)
    return False


def send_email(subject: str, html_body: str) -> bool:
    if not EMAIL_CONFIGURED:
        print("[notify] Email env vars missing — skipping.", flush=True)
        return False

    def _send():
        import resend
        resend.api_key = RESEND_API_KEY
        resend.Emails.send({
            "from": "Europe on Wheels <onboarding@resend.dev>",
            "to": [NOTIFY_EMAIL],
            "subject": subject,
            "html": html_body,
        })

    return _with_retry("Email", _send)


def send_whatsapp(text: str) -> bool:
    if not WHATSAPP_CONFIGURED:
        print("[notify] WhatsApp env vars missing — skipping.", flush=True)
        return False

    url = (
        f"https://api.green-api.com/waInstance{GREEN_API_INSTANCE}"
        f"/sendMessage/{GREEN_API_TOKEN}"
    )
    payload = json.dumps({
        "chatId": f"{WHATSAPP_PHONE}@c.us",
        "message": text,
    }).encode("utf-8")

    def _send():
        req = urllib.request.Request(
            url, data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status >= 400:
                    raise RuntimeError(f"Green API returned {resp.status}")
        except urllib.error.HTTPError as e:
            if e.code in (400, 401, 403, 404):
                raise PermanentNotificationError(f"Green API returned {e.code}") from e
            raise

    return _with_retry("WhatsApp", _send)


HOTEL_LABELS = {
    "3star":    "3 Star",
    "4star":    "4 Star",
    "5star":    "5 Star",
    "boutique": "Boutique",
    "heritage": "Heritage",
}

CAR_LABELS = {
    "sedan":        "Sedan (Škoda Octavia or similar)",
    "luxury-sedan": "Luxury Sedan (Mercedes E-Class or similar)",
    "mpv":          "MPV (Volkswagen Touran or similar)",
    "std-van":      "Standard Van (VW Caravelle or similar)",
    "luxury-van":   "Luxury Van (Mercedes V-Class or similar)",
}


FORM_TYPE_LABELS = {
    "single_country": "Single Country Tour",
    "multi_country":  "Multi-Country Tour",
    "custom_tour":    "Custom Tour",
}


def notify_enquiry(data: dict) -> bool:
    """Send both notifications. Returns True if at least one got through."""
    name        = data.get("name", "Someone")
    email       = data.get("email", "—")
    phone       = data.get("phone") or "—"
    country     = data.get("country") or "—"
    form_label  = FORM_TYPE_LABELS.get(data.get("form_type", ""), "Tour Enquiry")
    hotel_raw   = data.get("hotel_type") or ""
    hotel       = HOTEL_LABELS.get(hotel_raw, hotel_raw) or "—"
    car_raw     = data.get("vehicle_type") or ""
    car         = CAR_LABELS.get(car_raw, car_raw) or "—"
    budget      = data.get("budget_eur") or "—"
    currency    = data.get("currency") or "EUR"
    group       = data.get("group_size") or "—"
    boot        = data.get("luggage_boot")
    cabin       = data.get("luggage_cabin")
    luggage     = f"{boot} boot bag{'s' if boot != 1 else ''}, {cabin} cabin bag{'s' if cabin != 1 else ''}" if (boot is not None and cabin is not None) else "—"
    month       = data.get("travel_month") or "—"
    duration    = data.get("duration_days") or "—"
    notes       = data.get("special_requests") or "—"
    enquiry_id  = data.get("id", "—")

    # ── Email ──────────────────────────────────────────────────────────────
    html = f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#faf7f2">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header with amber gradient -->
        <tr>
          <td style="background:linear-gradient(135deg,#f59e0b,#d97706,#b45309);padding:32px 36px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:5px;
                      color:rgba(255,255,255,0.85);text-transform:uppercase;">&#x1f30d; Europe on Wheels</p>
            <h1 style="margin:10px 0 4px;font-size:24px;color:#ffffff;font-weight:800;">
              New {form_label}
            </h1>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);">Received just now &middot; <a href="https://europeonwheels.in" style="color:#fbbf24;text-decoration:none;">europeonwheels.in</a></p>
          </td>
        </tr>

        <!-- Customer info banner -->
        <tr>
          <td style="padding:24px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:12px;border:1px solid #fde68a;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0;font-size:20px;font-weight:700;color:#92400e;">&#x1f464; {name}</p>
                  <p style="margin:6px 0 0;font-size:14px;color:#b45309;">
                    <a href="mailto:{email}" style="color:#b45309;text-decoration:none;">&#x2709;&#xfe0f; {email}</a>
                    &nbsp;&nbsp;&middot;&nbsp;&nbsp;&#x1f4f1; {phone}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Destination -->
        <tr>
          <td style="padding:20px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#fef9ee;border-radius:10px;border-left:4px solid #f59e0b;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:2px;color:#92400e;text-transform:uppercase;">&#x1f5fa;&#xfe0f; Destinations</p>
                  <p style="margin:6px 0 0;font-size:17px;font-weight:700;color:#1c1917;">{country}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Trip details grid -->
        <tr>
          <td style="padding:20px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding:0 8px 12px 0;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f3;border-radius:10px;">
                    <tr><td style="padding:14px 16px;">
                      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#a8a29e;text-transform:uppercase;">&#x1f4c5; Travel Month</p>
                      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1c1917;">{month}</p>
                    </td></tr>
                  </table>
                </td>
                <td width="50%" style="padding:0 0 12px 8px;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f3;border-radius:10px;">
                    <tr><td style="padding:14px 16px;">
                      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#a8a29e;text-transform:uppercase;">&#x23f3; Duration</p>
                      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1c1917;">{duration} days</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding:0 8px 12px 0;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f3;border-radius:10px;">
                    <tr><td style="padding:14px 16px;">
                      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#a8a29e;text-transform:uppercase;">&#x1f465; Group Size</p>
                      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1c1917;">{group} people</p>
                    </td></tr>
                  </table>
                </td>
                <td width="50%" style="padding:0 0 12px 8px;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f3;border-radius:10px;">
                    <tr><td style="padding:14px 16px;">
                      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#a8a29e;text-transform:uppercase;">&#x1f3e8; Hotel</p>
                      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1c1917;">{hotel}</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding:0 8px 12px 0;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f3;border-radius:10px;">
                    <tr><td style="padding:14px 16px;">
                      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#a8a29e;text-transform:uppercase;">&#x1f697; Vehicle</p>
                      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1c1917;">{car}</p>
                    </td></tr>
                  </table>
                </td>
                <td width="50%" style="padding:0 0 12px 8px;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f3;border-radius:10px;">
                    <tr><td style="padding:14px 16px;">
                      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#a8a29e;text-transform:uppercase;">&#x1f9f3; Luggage</p>
                      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1c1917;">{luggage}</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Budget highlight -->
        <tr>
          <td style="padding:4px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:linear-gradient(135deg,#1c1917,#292524);border-radius:12px;">
              <tr>
                <td style="padding:18px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:2px;color:#a8a29e;text-transform:uppercase;">&#x1f4b0; Budget</p>
                      </td>
                      <td align="right">
                        <p style="margin:0;font-size:22px;font-weight:800;color:#f59e0b;">{currency} {budget}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Notes -->
        <tr>
          <td style="padding:20px 36px 0;">
            <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:2px;color:#a8a29e;text-transform:uppercase;">&#x1f4dd; Notes / Special Requests</p>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#f8f6f3;border-radius:10px;border-left:3px solid #d6d3d1;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0;font-size:14px;color:#44403c;line-height:1.7;font-style:italic;">{notes}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 36px;border-top:1px solid #e7e5e4;margin-top:24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:11px;color:#a8a29e;">Enquiry ID: <span style="color:#78716c;font-weight:600;">{enquiry_id}</span></p>
                </td>
                <td align="right">
                  <p style="margin:0;font-size:11px;"><a href="https://europeonwheels.in" style="color:#b45309;text-decoration:none;font-weight:600;">europeonwheels.in</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""

    emailed = send_email(f"New {form_label} from {name} — Europe on Wheels", html)

    # ── WhatsApp ───────────────────────────────────────────────────────────
    wa_text = (
        f"🌍 New {form_label}\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Phone: {phone}\n"
        f"Destination: {country}\n"
        f"Travel: {month} | {duration} days\n"
        f"Group: {group} | Hotel: {hotel}\n"
        f"Car: {car}\n"
        f"Luggage: {luggage}\n"
        f"Budget: {currency} {budget}"
    )
    whatsapped = send_whatsapp(wa_text)
    return emailed or whatsapped


def notify_contact(data: dict) -> bool:
    """Send both notifications. Returns True if at least one got through."""
    name = data.get("name", "Someone")
    email = data.get("email", "—")
    phone = data.get("phone", "")
    subject = data.get("subject", "—")
    message = data.get("message", "—")

    html = f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#faf7f2">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f59e0b,#d97706,#b45309);padding:32px 36px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:5px;
                      color:rgba(255,255,255,0.85);text-transform:uppercase;">&#x1f4e9; Europe on Wheels</p>
            <h1 style="margin:10px 0 4px;font-size:24px;color:#ffffff;font-weight:800;">New Contact Message</h1>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);">Received just now &middot; <a href="https://europeonwheels.in" style="color:#fbbf24;text-decoration:none;">europeonwheels.in</a></p>
          </td>
        </tr>

        <!-- Sender info -->
        <tr>
          <td style="padding:24px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:12px;border:1px solid #fde68a;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0;font-size:20px;font-weight:700;color:#92400e;">&#x1f464; {name}</p>
                  <p style="margin:6px 0 0;font-size:14px;color:#b45309;">
                    <a href="mailto:{email}" style="color:#b45309;text-decoration:none;">&#x2709;&#xfe0f; {email}</a>
                    {f'&nbsp;&nbsp;&#x1f4de; {phone}' if phone else ''}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Subject -->
        <tr>
          <td style="padding:20px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#fef9ee;border-radius:10px;border-left:4px solid #f59e0b;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:2px;color:#92400e;text-transform:uppercase;">&#x1f4cb; Subject</p>
                  <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:#1c1917;">{subject}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:20px 36px 0;">
            <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:2px;color:#a8a29e;text-transform:uppercase;">&#x1f4ac; Message</p>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#f8f6f3;border-radius:10px;border-left:3px solid #d6d3d1;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0;font-size:15px;color:#44403c;line-height:1.75;">{message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 36px;border-top:1px solid #e7e5e4;margin-top:24px;">
            <p style="margin:0;font-size:11px;text-align:center;"><a href="https://europeonwheels.in" style="color:#b45309;text-decoration:none;font-weight:600;">europeonwheels.in</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""
    emailed = send_email(f"Contact: {subject} — from {name}", html)

    wa_text = (
        f"📩 New Contact Message\n"
        f"From: {name}\n"
        f"Email: {email}\n"
        f"Phone: {phone}\n"
        f"Subject: {subject}\n"
        f"Message: {message[:200]}"
    )
    whatsapped = send_whatsapp(wa_text)
    return emailed or whatsapped
