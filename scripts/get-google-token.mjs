/**
 * Egyszer futtatandó szkript: Google OAuth2 refresh token generálása.
 * Használat (PowerShell):
 *   $env:GOOGLE_OAUTH_CLIENT_ID="..."; $env:GOOGLE_OAUTH_CLIENT_SECRET="..."; node scripts/get-google-token.mjs
 */
import { google } from "googleapis";
import http from "http";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("\n❌ Hiányzó env var! Így futtasd PowerShell-ben:\n");
  console.error('  $env:GOOGLE_OAUTH_CLIENT_ID="ide_a_client_id"; $env:GOOGLE_OAUTH_CLIENT_SECRET="ide_a_client_secret"; node scripts/get-google-token.mjs\n');
  process.exit(1);
}

const REDIRECT_URI = "http://localhost:3001";

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/calendar.events"],
  prompt: "consent",
});

console.log("\n📋 Másold be ezt az URL-t a böngészőbe:\n");
console.log(authUrl);
console.log("\n⏳ Várok a visszaigazolásra...\n");

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, REDIRECT_URI);
    const code = url.searchParams.get("code");
    if (!code) { res.end("Nincs kód a kérésben."); return; }

    res.end('<h2 style="font-family:sans-serif;color:green">✅ Sikeres! Zárd be ezt a fület és nézd a terminált.</h2>');
    server.close();

    const { tokens } = await oauth2Client.getToken(code);

    console.log("✅ REFRESH TOKEN (mentsd el!):\n");
    console.log(tokens.refresh_token);
    console.log("\n👉 Vercel env var neve: GOOGLE_OAUTH_REFRESH_TOKEN");
    console.log("👉 .env.local-ba is add hozzá (lokális teszteléshez)\n");
    process.exit(0);
  } catch (err) {
    console.error("Hiba:", err.message);
    res.end("Hiba: " + err.message);
    process.exit(1);
  }
});

server.listen(3001);
