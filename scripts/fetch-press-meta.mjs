import fs from "node:fs";
import path from "node:path";

/** Raw URLs with spaces as pasted by user */
const raw = `
https://www.milliyet.com.tr/cadde/gururlandiran -atama -6473607
https://www.milliyet.com.tr/ekonomi/depremden -sonra -yazlik -yerlerde -kiralik -ve- satilik -ev-fiyatlari - yukseldi -6917629
https://www.milliyet.com.tr/cadde/bodrum -son-donemin -parlayan -yildizi -6381666
https://www.milliyet.com.tr/ekonomi/gayrimenkul -sektoru -sonuclardan -memnun - 6948326
https://www.milliyet.com.tr/cadde/mimarlik -sanatla -bulustu -6800851
https://www.milliyet.com.tr/egitim/egitimde -korona -gocu -6457409
https://www.milliyet.com.tr/cadde/farkindalik -icin-bir-arada -6644344
https://www.milliyet.com.tr/cadde/oduller -dagitildi -6550842
https://www.milliyet.com.tr/ekonomi/bddkdan -yeni-adim -kredilerde -dikkat -ceken - yuzde -75-karari -6997291
https://www.milliyet.com.tr/cadde/luks -markalar -bulustu -6602197
https://www.hurriyet.com.tr/ekonomi/gayrimenkul -sektoru -sonuclardan -memnun - 42267866
https://www.hurriyet.com.tr/yerel -haberler/izmir/bodrum -yaza -hazirlaniyor -41797532
https://www.hurriyet.com.tr/yerel -haberler/izmir/bodrum -yine-gozde -41694404
https://www.hurriyet.com.tr/ekonomi/gayrimenkul -temsilcileri -uyardi -internetteki - buyuk -tehlike -41713795
https://www.hurriyet.com.tr/ekonomi/faiz -indirimi -nasil -etkiledi -konutta -gundem - yine-fiyat-uzmanlar - uyardi -41930992
https://www.hurriyet.com.tr/ekonomi/emlak -vergisi -ikinci -taksit -odemeleri -basliyor - yapmayana -cezasi -var- 41920974
https://www.cumhuriyet.com.tr/ekonomi/gayrimenkul -uzmani -bankalar -konutta -kredi - musluklarini -acmali - 2057579
https://www.cumhuriyet.com.tr/ekonomi/ev -kiralamak -bu-zamanda -atesten -gomlek - oldu -2025310
https://www.cumhuriyet.com.tr/ekonomi/kira -krizi-bodrumu -vurdu -ev-sahiplerinden - ilginc -sart-2021257
https://www.cumhuriyet.com.tr/ekonomi/kredi -faizleri -dusunce -ev-fiyatlari -firladi - 1883436
https://www.iha.com.tr/haber -gayrimenkul -uzmani -sule-alp-uyariyor -1150463
https://www.iha.com.tr/ankara -haberleri/gayrimenkul -sektoru -noterlerle -birlikte - rahatlayacak -13144883
https://www.iha.com.tr/ankara -haberleri/gayrimenkul -uzmani -duman -ev-alacaklari - uyardi -24315892
https://www.iha.com.tr/haber -gayrimenkul -uzmani -alp-bankalar -konutta -kredi - musluklarini -acmali - 1152317
https://www.iha.com.tr/ankara -haberleri/torba -yasa -oncesinde -gayrimenkul -alim- firsati -veriyor -29532392
https://www.iha.com.tr/ankara -haberleri/gayrimenkul -uzmani -duman -bddk -dogru -bir- karar -almistir - 30275589
https://www.posta.com.tr/ekonomi/kiracilardan -kredi -notunu -ve-sgk-dokumlerini - istiyorlar -ev-sahipleri - bunu -da-yapti -2386254
https://www.posta.com.tr/ekonomi/yabancinin -konutta -bodrum -sevdasi -2308920
https://www.yenigungazetesi.net/ekonomi/bodrum -artik -kisin -da-dolu -57531h
https://www.yenigungazetesi.net/guncel/ev -sahiplerinden -kiram -odenmiyor -taktigi - 78596h
https://www.yenigungazetesi.net/guncel/yeni -evimde -kaparo -dolandiriciligina -dikkat - 79118h
https://www.yenigungazetesi.net/guncel/evin -depreme -karsi -guvenli -oldugu -nasil - anlasilir -80133h
https://www.yenigungazetesi.net/ekonomi/bankalar -konutta -kredi -musluklarini -acmali -80968h
https://www.yenigungazetesi.net/ekonomi/gayrimenkul -uzmani -sule-alp- uyariyorpanikle -kacis -yanlis - tercihe -neden -olabilir -82845h
https://www.yenigungazetesi.net/ekonomi/kiralar -dusecek -mi-isin-uzmani -net- aciklamalar -yapti -105520h
https://www.yeniakit.com.tr/haber/ev -kiralariyla -ilgili-cok-onemli -uyari -1738910.html
https://www.yeniakit.com.tr/haber/ev -sahibinin -oyununu -posta -yoluyla -asin- 1721309.html
https://www.yeniakit.com.tr/haber/iste -liste-en-cok-hangi -ulke-vatandaslari - gayrimenkul -aldi-1596893.html
https://www.yeniakit.com.tr/haber/uzman -isimden -aciklama -geldi -bina -riskli -cikarsa - kiraci -ne-yapacak - 1737737.html
https://www.yeniakit.com.tr/haber/bu -hatayi -yapmayin -ev-alacaklarin -kulagina -kupe - olsun -1777282.html
https://www.yeniakit.com.tr/haber/kiralik -daire -ev-fiyati -dusecek -diyen -gayrimenkul - uzmani -sebebini - boyle -anlatti -bosaltacaklari -kiralik -evler -1763134.html
https://www.yeniakit.com.tr/haber/iste -dolandiricilarin -yeni-tezgahi -yeni-evim - kampanyasina - basvuracaklar -dikkat -1725839.html
https://www.yeniakit.com.tr/haber/2023 -gayrimenkulde -altin -yil-olacak -1721883.html
https://www.yeniakit.com.tr/haber/bodrumdaki -kiralik -evlerde -ilginc -taktik - 1724342.html
https://www.yeniakit.com.tr/haber/o -ilimizdeki -ev-ve-arsa-fiyatlari -ucusa -gecti -durmak -bilmiyor1741744.htm
`.trim();

function cleanUrl(line) {
  let u = line.replace(/\s+/g, "");
  u = u.replace("uyariyorpanikle", "uyariyor-panikle");
  u = u.replace("bilmiyor1741744", "bilmiyor-1741744");
  return u;
}

function publicationFromHost(host) {
  if (host.includes("milliyet")) return "Milliyet";
  if (host.includes("hurriyet")) return "Hürriyet";
  if (host.includes("cumhuriyet")) return "Cumhuriyet";
  if (host.includes("iha.com")) return "İHA";
  if (host.includes("posta.com")) return "Posta";
  if (host.includes("yenigungazetesi")) return "Yeni Gün Gazetesi";
  if (host.includes("yeniakit")) return "Yeni Akit";
  return host.replace("www.", "");
}

function titleFromSlug(url) {
  try {
    const { pathname } = new URL(url);
    const last = pathname.split("/").filter(Boolean).pop() || "";
    const base = last
      .replace(/\.html?$/i, "")
      .replace(/-\d{5,}h?$/i, "")
      .replace(/-/g, " ")
      .trim();
    return base
      .split(" ")
      .filter(Boolean)
      .map((w) => (w.length <= 2 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join(" ");
  } catch {
    return "Basın Haberi";
  }
}

function slugFromUrl(url) {
  const { hostname, pathname } = new URL(url);
  const pub = hostname.replace("www.", "").split(".")[0];
  const last = pathname.split("/").filter(Boolean).pop() || "haber";
  return `${pub}-${last}`
    .toLowerCase()
    .replace(/\.html?$/i, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchMeta(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SuleAlpSiteBot/1.0; +https://sulealp.com)",
        Accept: "text/html",
      },
      redirect: "follow",
    });
    clearTimeout(t);
    if (!res.ok) return { url, ok: false, status: res.status };
    const html = await res.text();
    const og =
      html.match(
        /property=["']og:title["']\s+content=["']([^"']+)["']/i,
      ) ||
      html.match(
        /content=["']([^"']+)["']\s+property=["']og:title["']/i,
      );
    const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const desc =
      html.match(
        /property=["']og:description["']\s+content=["']([^"']+)["']/i,
      ) ||
      html.match(
        /name=["']description["']\s+content=["']([^"']+)["']/i,
      );
    let title = decodeHtml((og?.[1] || titleTag?.[1] || "").split("|")[0].split("- Milliyet")[0].split(" - Hürriyet")[0].split(" - Cumhuriyet")[0]);
    if (title.length > 140) title = title.slice(0, 137) + "…";
    const excerpt = decodeHtml(desc?.[1] || "").slice(0, 220);
    return { url: res.url || url, ok: true, title, excerpt };
  } catch (e) {
    clearTimeout(t);
    return { url, ok: false, error: String(e.message || e) };
  }
}

const urls = raw
  .split(/\n+/)
  .map((l) => l.trim())
  .filter(Boolean)
  .map(cleanUrl)
  // skip incomplete IHA stubs without slug
  .filter((u) => !/haberleri\/-\d+$/.test(u) && !/haberleri\/\d+$/.test(u));

const results = [];
for (let i = 0; i < urls.length; i += 5) {
  const batch = urls.slice(i, i + 5);
  const part = await Promise.all(batch.map(fetchMeta));
  results.push(...part);
  console.log(`fetched ${Math.min(i + 5, urls.length)}/${urls.length}`);
}

const outPath = path.join(process.cwd(), "scripts", "press-fetched.json");
fs.writeFileSync(outPath, JSON.stringify({ urls, results }, null, 2));
console.log("wrote", outPath);
console.log(
  "ok",
  results.filter((r) => r.ok).length,
  "fail",
  results.filter((r) => !r.ok).length,
);
