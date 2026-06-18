import { google } from "googleapis";

const TZ = "Europe/Budapest";

function parsePrivateKey(raw: string | undefined): string {
  if (!raw) return "";
  return raw
    .replace(/\\n/g, "\n")
    .replace(/\r/g, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

function getAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN });
  return oauth2;
}

async function sendBrevoEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: { name: "AI Flux", email: "info@aiflux.hu" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Brevo hiba: ${txt}`);
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("hu-HU", {
    timeZone: TZ,
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export async function POST(req: Request) {
  let body: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    business?: string;
    automationGoal: string;
    hasWebsite: boolean;
    budget: string;
    notes?: string;
    slot: { start: string; end: string };
    gdpr: boolean;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Érvénytelen kérés." }, { status: 400 });
  }

  const { name, email, phone, company, business, automationGoal, hasWebsite, budget, notes, slot, gdpr } = body;

  if (!name || !email || !automationGoal || !slot?.start || !slot?.end || !gdpr) {
    return Response.json({ error: "Hiányzó kötelező mezők." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Érvénytelen e-mail cím." }, { status: 400 });
  }

  try {
    const auth = getAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const eventDescription = [
      `Érdeklődő: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone || "nem adta meg"}`,
      `Cég: ${company || "nem adta meg"}`,
      `Mivel foglalkoznak: ${business || "nem adta meg"}`,
      `Mit automatizálna: ${automationGoal}`,
      `Van weboldal: ${hasWebsite ? "Igen" : "Nem"}`,
      `Büdzsé: ${budget}`,
      `Egyéb: ${notes || "-"}`,
    ].join("\n");

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      conferenceDataVersion: 1,
      sendUpdates: "none",
      requestBody: {
        summary: `AI Flux konzultáció - ${name}`,
        description: eventDescription,
        start: { dateTime: slot.start, timeZone: TZ },
        end: { dateTime: slot.end, timeZone: TZ },
        conferenceData: {
          createRequest: {
            requestId: `aiflux-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    const meetLink = event.data.conferenceData?.entryPoints?.find(
      (ep) => ep.entryPointType === "video"
    )?.uri ?? "";
    const dateLabel = formatDate(slot.start);

    // Email a tulajdonosnak
    await sendBrevoEmail(
      process.env.BOOKING_NOTIFICATION_EMAIL!,
      `Új konzultáció: ${name} – ${dateLabel}`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#00E5FF;">Új konzultációs foglalás érkezett</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;width:160px;">Időpont:</td><td style="padding:8px 0;font-weight:bold;">${dateLabel}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Név:</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">E-mail:</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Telefon:</td><td style="padding:8px 0;">${phone || "-"}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Cég:</td><td style="padding:8px 0;">${company || "-"}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Mivel fogl.:</td><td style="padding:8px 0;">${business || "-"}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Automatizálás:</td><td style="padding:8px 0;">${automationGoal}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Van weboldal:</td><td style="padding:8px 0;">${hasWebsite ? "Igen" : "Nem"}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Büdzsé:</td><td style="padding:8px 0;">${budget}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Egyéb:</td><td style="padding:8px 0;">${notes || "-"}</td></tr>
        </table>
        ${meetLink ? `<p style="margin-top:20px;"><a href="${meetLink}" style="background:#00E5FF;color:#000;padding:10px 20px;text-decoration:none;border-radius:6px;font-weight:bold;">Google Meet megnyitása</a></p>` : ""}
      </div>`
    );

    // Visszaigazoló email az érdeklődőnek
    await sendBrevoEmail(
      email,
      `Foglalás visszaigazolva – AI Flux konzultáció`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#050510;color:#fff;padding:32px;border-radius:12px;">
        <img src="https://aiflux.hu/logo.png" alt="AI Flux" style="height:36px;margin-bottom:24px;" />
        <h2 style="color:#00E5FF;margin-top:0;">Foglalásod visszaigazolva!</h2>
        <p style="color:rgba(255,255,255,0.8);">Szia ${name}!<br/>Örömmel várunk a konzultációra. Az alábbi időpontban csatlakozunk hozzád Google Meet-en:</p>
        <div style="background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.25);border-radius:8px;padding:16px 20px;margin:20px 0;">
          <p style="margin:0;font-size:20px;font-weight:bold;color:#fff;">📅 ${dateLabel}</p>
          ${meetLink ? `<p style="margin:8px 0 0;"><a href="${meetLink}" style="color:#00E5FF;">${meetLink}</a></p>` : ""}
        </div>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;">Ha bármilyen kérdésed van, írj nekünk: <a href="mailto:info@aiflux.hu" style="color:#00E5FF;">info@aiflux.hu</a></p>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;">Az AI Flux csapata</p>
      </div>`
    );

    return Response.json({ success: true, meetLink, dateLabel });
  } catch (err) {
    console.error("Booking submit hiba:", err);
    return Response.json({ error: "Foglalás sikertelen. Próbáld újra vagy írj: info@aiflux.hu" }, { status: 500 });
  }
}
