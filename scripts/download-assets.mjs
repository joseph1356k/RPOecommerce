import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = "https://tiendarpo.com/cdn/shop/files/";
const COLLECTIONS_BASE = "https://tiendarpo.com/cdn/shop/collections/";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url || url.startsWith("data:") || url.startsWith("blob:")) return resolve();
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(dest)) return resolve();

    const proto = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    proto.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { file.close(); return resolve(); }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (e) => { try { fs.unlinkSync(dest); } catch {} reject(e); });
  });
}

async function batch(tasks, concurrency = 4) {
  let i = 0;
  async function run() {
    while (i < tasks.length) {
      const task = tasks[i++];
      try { await task(); } catch(e) { console.error("  ✗", e.message); }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
}

function img(file, dest) { return [BASE + file, "images/" + dest]; }
function col(file, dest) { return [COLLECTIONS_BASE + file, "images/categories/" + dest]; }

const ASSETS = [
  // Fonts
  ["https://tiendarpo.com/cdn/fonts/red_hat_display/redhatdisplay_n4.36efd597fcb92d83eab631792bad06e153941221.woff2", "fonts/redhatdisplay_n4.woff2"],
  ["https://tiendarpo.com/cdn/fonts/red_hat_display/redhatdisplay_n6.ec4ce1e249dd5ea953e56ae98197fb6bf35c9b19.woff2", "fonts/redhatdisplay_n6.woff2"],
  ["https://tiendarpo.com/cdn/fonts/red_hat_display/redhatdisplay_n8.1e57d44bad369c94b0bead067c41a169246b31f6.woff2", "fonts/redhatdisplay_n8.woff2"],
  ["https://tiendarpo.com/cdn/fonts/trirong/trirong_n2.b68a86e98f805879a534f610d0ee522f6a16ef68.woff2", "fonts/trirong_n2.woff2"],

  // Logos
  img("LOGO_MENU_PRINCIPAL_CT_Mesa_de_trabajo_1.png", "logo-black.png"),
  img("LOGO_MENU_PRINCIPAL_BLANCO_Mesa_de_trabajo_1.png", "logo-white.png"),

  // Hero slider (actual slide images)
  img("1B358441-4F3B-44DE-91CA-0DBDE691E262.jpg", "hero/slide-1.jpg"),
  img("37C643C6-E126-4FEF-8E50-9364B7FC9574.jpg", "hero/slide-2.jpg"),
  img("99683CC3-C79F-4F0E-8759-695BC1063A62.jpg", "hero/slide-3.jpg"),
  img("285CEB1F-FFAB-46E6-BC89-CD35F23C51AD.jpg", "hero/slide-4.jpg"),
  // Hero (mobile version)
  img("4B7AA3A7-99BE-4E5D-B3F8-03E69CDF361D.jpg", "hero/slide-1-alt.jpg"),
  img("EF20CA48-C76C-4688-BD46-A5036F57E8FA.jpg", "hero/slide-2-alt.jpg"),
  img("FD8D77F9-4520-4347-8181-222C190021F5.jpg", "hero/slide-3-alt.jpg"),
  img("2C67BF4D-5296-4444-BCEC-1BE8A104A5D5.jpg", "hero/slide-4-alt.jpg"),

  // Banners
  img("Banner_envio_gratis_pc_5d942629-7fd8-4e3a-937e-6aeb85498851.png", "banners/envio-gratis.png"),
  img("Banner_pagos_seguros_Banner_horizontal.png", "banners/pagos-seguros.png"),

  // Category grid
  col("1.png", "sets.png"),
  col("2.png", "enterizos.png"),
  col("3.png", "leggins.png"),
  col("5.png", "tops.png"),

  // Products - Esencia By Dany Osorno
  img("67D243EC-2B2B-4685-B81B-3295600B9722.jpg", "products/esencia-enterizo-largo-h.jpg"),
  img("884A428D-6A89-4160-AA1C-2AAF181CADB8.jpg", "products/esencia-2.jpg"),
  img("D9BB75C6-FB49-48DC-89D3-99CE0118CF43.jpg", "products/esencia-3.jpg"),
  img("3CA71F2B-255A-411B-BFDE-1ADE9098D43E.jpg", "products/esencia-4.jpg"),
  img("F6396216-8E86-455B-90CE-696265D98FB5.jpg", "products/esencia-5.jpg"),
  img("366A3169-CBFC-4A44-B6D1-02FDCD5A2C06.jpg", "products/esencia-6.jpg"),
  img("7F53E25C-46E8-4064-BE54-9BB907E17599.jpg", "products/esencia-7.jpg"),
  img("3C059E5A-0AA1-4C95-9B9B-BCB088AD637D.jpg", "products/esencia-8.jpg"),

  // Products - Prisma
  img("886D24AD-7C34-4B51-8C7B-D3B77A5210C8.jpg", "products/prisma-1.jpg"),
  img("6C5989A0-9CF7-4C72-B091-271283D34D0A.jpg", "products/prisma-2.jpg"),
  img("13F08CD7-C287-4A37-A4C4-56A4B15BBFDC.jpg", "products/prisma-3.jpg"),
  img("65CD35E5-1EEA-47BD-A4A7-4B8CC1EFFFE4.jpg", "products/prisma-4.jpg"),
  img("B9FFAFCD-8339-466D-8147-78B1F634383D.jpg", "products/prisma-5.jpg"),
  img("2893C7EC-884B-4A0E-BBFC-291AE204FC0A.jpg", "products/prisma-6.jpg"),
  img("A860E427-C876-49F8-A9D3-1755BB21F4C2.jpg", "products/prisma-7.jpg"),
  img("81298EB4-2B88-4927-8C64-E173C89F0B5F.jpg", "products/prisma-8.jpg"),
  img("35A9A1DD-71A7-4737-BE07-6D19FE7093A8.jpg", "products/prisma-9.jpg"),
];

const tasks = ASSETS.map(([url, dest]) => () => {
  const fullDest = path.join(ROOT, "public", dest);
  if (fs.existsSync(fullDest)) return Promise.resolve();
  console.log("  ↓", dest);
  return download(url, fullDest);
});

console.log(`Downloading ${tasks.length} assets (skipping existing)...`);
await batch(tasks, 6);
console.log("Done.");
