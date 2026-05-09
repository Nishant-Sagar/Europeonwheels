import os
import smtplib
import urllib.parse
import urllib.request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL")
WHATSAPP_PHONE = os.getenv("WHATSAPP_PHONE")   # e.g. 918210564714
GREEN_API_INSTANCE = os.getenv("GREEN_API_INSTANCE")
GREEN_API_TOKEN = os.getenv("GREEN_API_TOKEN")


def send_email(subject: str, html_body: str) -> None:
    if not SMTP_USER or not SMTP_PASS or not NOTIFY_EMAIL:
        print("[notify] Email env vars missing — skipping.")
        return
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Europe on Wheels <{SMTP_USER}>"
        msg["To"] = NOTIFY_EMAIL
        msg.attach(MIMEText(html_body, "html"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.sendmail(SMTP_USER, NOTIFY_EMAIL, msg.as_string())
        print(f"[notify] Email sent to {NOTIFY_EMAIL}")
    except Exception as e:
        print(f"[notify] Email error: {e}")


def send_whatsapp(text: str) -> None:
    if not WHATSAPP_PHONE or not GREEN_API_INSTANCE or not GREEN_API_TOKEN:
        print("[notify] WhatsApp env vars missing — skipping.")
        return
    try:
        import json
        url = (
            f"https://api.green-api.com/waInstance{GREEN_API_INSTANCE}"
            f"/sendMessage/{GREEN_API_TOKEN}"
        )
        payload = json.dumps({
            "chatId": f"{WHATSAPP_PHONE}@c.us",
            "message": text,
        }).encode("utf-8")
        req = urllib.request.Request(
            url, data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(f"[notify] WhatsApp sent via Green API, status={resp.status}")
    except Exception as e:
        print(f"[notify] WhatsApp error: {e}")


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


def notify_enquiry(data: dict) -> None:
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
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0f0f0f">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#1c1917;border-radius:12px;overflow:hidden;border:1px solid #292524;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1c1917,#292524);
                     padding:28px 32px;border-bottom:1px solid #292524;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:4px;
                      color:#f59e0b;text-transform:uppercase;">Europe on Wheels</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#fff;">
              New {form_label}
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;">

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Name</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#fff;font-weight:600;">{name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Email</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#f59e0b;">
                    <a href="mailto:{email}" style="color:#f59e0b;text-decoration:none;">{email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Phone / WhatsApp</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{phone}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Destinations</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{country}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Travel Month / Dates</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{month}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Duration</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{duration} days</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Group Size</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{group} people</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Hotel Preference</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{hotel}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Car / Vehicle</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{car}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Luggage</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{luggage}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Budget</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#f59e0b;font-weight:700;">{currency} {budget}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Notes / Special Requests</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#d4cdc7;line-height:1.6;">{notes}</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #292524;background:#161412;">
            <p style="margin:0;font-size:12px;color:#57534e;">
              Enquiry ID: {enquiry_id} &nbsp;·&nbsp; europeonwheels.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""

    send_email(f"New {form_label} from {name} — Europe on Wheels", html)

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
    send_whatsapp(wa_text)


def notify_contact(data: dict) -> None:
    name = data.get("name", "Someone")
    email = data.get("email", "—")
    subject = data.get("subject", "—")
    message = data.get("message", "—")

    html = f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0f0f0f">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#1c1917;border-radius:12px;overflow:hidden;border:1px solid #292524;">
        <tr>
          <td style="background:linear-gradient(135deg,#1c1917,#292524);
                     padding:28px 32px;border-bottom:1px solid #292524;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:4px;
                      color:#f59e0b;text-transform:uppercase;">Europe on Wheels</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#fff;">New Contact Message</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">From</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#fff;font-weight:600;">{name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Email</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#f59e0b;">
                    <a href="mailto:{email}" style="color:#f59e0b;text-decoration:none;">{email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #292524;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Subject</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#fff;">{subject}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <p style="margin:0;font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:1px;">Message</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#d4cdc7;line-height:1.6;">{message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #292524;background:#161412;">
            <p style="margin:0;font-size:12px;color:#57534e;">europeonwheels.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
"""
    send_email(f"Contact: {subject} — from {name}", html)

    wa_text = (
        f"📩 New Contact Message\n"
        f"From: {name}\n"
        f"Email: {email}\n"
        f"Subject: {subject}\n"
        f"Message: {message[:200]}"
    )
    send_whatsapp(wa_text)
