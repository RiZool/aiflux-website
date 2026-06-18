import { google } from "googleapis";
import { NextRequest } from "next/server";

const WORKING_START = 9;
const WORKING_END = 17;
const SLOT_DURATION_MS = 60 * 60 * 1000;
const TZ = "Europe/Budapest";
const MIN_ADVANCE_MS = 2 * 60 * 60 * 1000; // min. 2 óra előre

// Budapest UTC offset dinamikusan (CEST: +2, CET: +1)
function getBudapestOffset(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  const formatter = new Intl.DateTimeFormat("en", {
    timeZone: TZ, timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(d);
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+2";
  const match = offsetPart.match(/([+-]\d+)/);
  if (!match) return "+02:00";
  const h = parseInt(match[1]);
  return `${h >= 0 ? "+" : "-"}${String(Math.abs(h)).padStart(2, "0")}:00`;
}

function parsePrivateKey(raw: string | undefined): string {
  if (!raw) return "";
  return raw
    .replace(/\\n/g, "\n")   // escaped \n → valódi newline (Vercel env var)
    .replace(/\r/g, "")       // Windows CRLF eltávolítás
    .replace(/^["']|["']$/g, "")  // véletlen idézőjelek eltávolítása
    .trim();
}

function getAuth(scopes: string[]) {
  return new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: parsePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes,
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return Response.json({ error: "Érvénytelen dátum." }, { status: 400 });
  }

  const dayOfWeek = new Date(`${dateStr}T12:00:00Z`).getUTCDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return Response.json({ slots: [] });
  }

  const minStart = Date.now() + MIN_ADVANCE_MS;
  const tzOffset = getBudapestOffset(dateStr);

  try {
    const auth = getAuth(["https://www.googleapis.com/auth/calendar.readonly"]);
    const calendar = google.calendar({ version: "v3", auth });

    const dayStart = new Date(`${dateStr}T00:00:00${tzOffset}`);
    const dayEnd = new Date(`${dateStr}T23:59:59${tzOffset}`);
    const calId = process.env.GOOGLE_CALENDAR_ID!;

    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        timeZone: TZ,
        items: [{ id: calId }],
      },
    });

    const calData = freebusyRes.data.calendars?.[calId];
    const busySlots = calData?.busy ?? [];

    // Ha az API hibát jelez vissza (pl. nincs hozzáférés)
    if (calData?.errors && calData.errors.length > 0) {
      const reason = calData.errors[0].reason ?? "ismeretlen";
      return Response.json({ error: `Naptár hozzáférési hiba: ${reason}` }, { status: 500 });
    }


    const slots = [];
    for (let hour = WORKING_START; hour < WORKING_END; hour++) {
      const startMs = new Date(`${dateStr}T${String(hour).padStart(2, "0")}:00:00${tzOffset}`).getTime();
      const endMs = startMs + SLOT_DURATION_MS;

      if (startMs < minStart) continue;

      const isBusy = busySlots.some((busy) => {
        const bs = new Date(busy.start!).getTime();
        const be = new Date(busy.end!).getTime();
        return startMs < be && endMs > bs;
      });

      if (!isBusy) {
        slots.push({
          start: new Date(startMs).toISOString(),
          end: new Date(endMs).toISOString(),
          label: `${String(hour).padStart(2, "0")}:00`,
        });
      }
    }

    return Response.json({ slots });
  } catch (err) {
    console.error("Slots API hiba:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: `Naptár lekérdezés sikertelen: ${msg}` }, { status: 500 });
  }
}
