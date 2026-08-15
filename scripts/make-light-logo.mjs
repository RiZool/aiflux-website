// A logo.png "AI" felirata fehér — világos témán láthatatlan lenne.
// Itt csak a fehéres (telítetlen, világos) képpontokat színezzük sötétre,
// a cyan/kék F-monogram és a "Flux" felirat érintetlen marad.
import sharp from 'sharp';

const SRC = 'public/logo.png';
const OUT = 'public/logo-light.png';
const INK = [11, 21, 38]; // #0b1526 — a világos téma --text értéke

(async () => {
  const img = sharp(SRC).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let touched = 0;

  for (let i = 0; i < data.length; i += channels) {
    const a = data[i + 3];
    if (a === 0) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const lightness = max / 255;
    const saturation = max === 0 ? 0 : (max - min) / max;

    // Fehéres = alig telített ÉS világos
    if (saturation < 0.18 && lightness > 0.6) {
      // A telítettséggel arányosan keverünk, hogy az élsimított
      // szélek ne lépcsőződjenek el
      const t = Math.min(1, (0.18 - saturation) / 0.18);
      data[i]     = Math.round(r * (1 - t) + INK[0] * t);
      data[i + 1] = Math.round(g * (1 - t) + INK[1] * t);
      data[i + 2] = Math.round(b * (1 - t) + INK[2] * t);
      touched++;
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT);
  console.log(`kesz: ${OUT} (${touched} kepponton szineztunk, ${width}x${height})`);
})();
