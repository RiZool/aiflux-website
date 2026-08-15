// ── Téma-kezelés ──────────────────────────────────────────────
// Egyetlen igazságforrás: a <html data-theme="..."> attribútum.
// A CSS a globals.css :root / :root[data-theme="light"] blokkjaiban él.

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "aiflux-theme";

/** Az oldal alapértelmezett arca. A márka sötét — aki nem választ, azt kapja. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * A <head>-be beágyazott, renderelés ELŐTT lefutó script.
 * Enélkül a sötét alapértelmezés villanna fel a világos témát választóknál.
 * Szándékosan pici és try/catch-elt: privát böngészőben a localStorage dobhat.
 */
export const themeInitScript = `(function(){try{
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}
}catch(e){}})();`;

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* privát mód — a téma csak erre a munkamenetre marad meg */
  }
}

export function readTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}
