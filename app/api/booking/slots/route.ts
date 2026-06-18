import { google } from "googleapis";
import { NextRequest } from "next/server";

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const WORKING_START = 9;
const WORKING_END = 17;
const SLOT_DURATION_MS = 60 * 60 * 1000;
const TZ = "Europe/Budapest";
// Minimálisan ennyivel a jövőben kell lennie a foglalható időpontnak
const MIN_ADVANCE_MS = 24 * 60 * 60 * 1000;

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return Response.json({ error: "Érvénytelen dátum." }, { status: 400 });
  }

  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = new Date(`${dateStr}T12:00:00Z`).getUTCDay();

  // Hétvégék kizárása
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return Response.json({ slots: [] });
  }

  // Múltbeli dátumok és túl közeli időpontok kizárása
  const minStart = Date.now() + MIN_ADVANCE_MS;

  try {
    const auth = getAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const dayStart = new Date(`${dateStr}T00:00:00+02:00`);
    const dayEnd = new Date(`${dateStr}T23:59:59+02:00`);

    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        timeZone: TZ,
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    const calId = process.env.GOOGLE_CALENDAR_ID!;
    const busySlots = freebusyRes.data.calendars?.[calId]?.busy ?? [];

    // Összes lehetséges slot generálása (9:00, 10:00, ... 16:00)
    const slots = [];
    for (let hour = WORKING_START; hour < WORKING_END; hour++) {
      const startISO = `${dateStr}T${String(hour).padStart(2, "0")}:00:00+02:00`;
      const startMs = new Date(startISO).getTime();
      const endMs = startMs + SLOT_DURATION_MS;

      // Múltbeli / túl közeli slot kizárás
      if (startMs < minStart) continue;

      // Foglalt slot kizárás
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
    return Response.json({ error: "Naptár lekérdezés sikertelen." }, { status: 500 });
  }
}
