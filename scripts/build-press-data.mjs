import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("scripts/press-fetched.json", "utf8"));

function decode(s) {
  return (s || "")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromSlug(url) {
  const parts = new URL(url).pathname.split("/").filter(Boolean);
  const last = (parts[parts.length - 1] || "haber")
    .replace(/\.html?$/i, "")
    .replace(/-\d{5,}h?$/i, "")
    .replace(/-/g, " ");
  return last.replace(/(^|\s)\S/g, (m) => m.toUpperCase());
}

function cleanTitle(t, url) {
  t = decode(t)
    .replace(/\s*[|].*$/, "")
    .replace(/\s*İhlas Haber Ajansı.*/i, "")
    .replace(/\s*-\s*(Milliyet|Hürriyet|Cumhuriyet|Posta|Yeni Gün).*$/i, "")
    .trim();

  if (
    !t ||
    t.length < 8 ||
    t === "BDDK" ||
    /:$/.test(t) ||
    /^Yeni Gün/i.test(t) ||
    t === "Ana Sayfa"
  ) {
    t = titleFromSlug(url);
  }

  const fixes = {
    "Bddkdan Yeni Adim Kredilerde Dikkat Ceken Yuzde 75 Karari":
      "BDDK’dan yeni adım: Kredilerde dikkat çeken yüzde 75 kararı",
    "Kira Krizi Bodrum": "Kira krizi Bodrum’u vurdu",
    "Gayrimenkul Uzmanı:":
      "Gayrimenkul uzmanı: Bankalar konutta kredi musluklarını açmalı",
    "Dikkat: Milyonları Ilgilendiriyor! 1 Kasım":
      "Emlak vergisi ikinci taksit ödemeleri başlıyor",
    "Gayrimenkul Uzmani Sule Alp Uyariyor Panikle Kacis Yanlis Tercihe Neden Olabilir":
      "Gayrimenkul uzmanı Şule Alp uyarıyor: Panikle kaçış yanlış tercihe neden olabilir",
    "Bankalar Konutta Kredi Musluklarini Acmali":
      "Bankalar konutta kredi musluklarını açmalı",
    "Bodrum Artik Kisin Da Dolu": "Bodrum artık kışın da dolu",
    "Ev Sahiplerinden Kiram Odenmiyor Taktigi":
      "Ev sahiplerinden ‘kiram ödenmiyor’ taktiği",
    "Yeni Evimde Kaparo Dolandiriciligina Dikkat":
      "Yeni Evim’de kaparo dolandırıcılığına dikkat",
    "Evin Depreme Karsi Guvenli Oldugu Nasil Anlasilir":
      "Evin depreme karşı güvenli olduğu nasıl anlaşılır?",
    "Kiralar Dusecek Mi Isin Uzmani Net Aciklamalar Yapti":
      "Kiralar düşecek mi? İşin uzmanı net açıklamalar yaptı",
  };
  if (fixes[t]) t = fixes[t];

  return t.slice(0, 120);
}

function publication(url) {
  const h = new URL(url).hostname;
  if (h.includes("milliyet")) return "Milliyet";
  if (h.includes("hurriyet")) return "Hürriyet";
  if (h.includes("cumhuriyet")) return "Cumhuriyet";
  if (h.includes("iha.com")) return "İHA";
  if (h.includes("posta.com")) return "Posta";
  if (h.includes("yenigungazetesi")) return "Yeni Gün Gazetesi";
  if (h.includes("yeniakit")) return "Yeni Akit";
  return h.replace("www.", "");
}

function idDate(url) {
  const m = url.match(/(\d{6,})/);
  const id = m ? Number(m[1]) : 0;
  if (url.includes("milliyet")) {
    if (id >= 6990000) return "2023-06-15";
    if (id >= 6940000) return "2023-05-15";
    if (id >= 6910000) return "2023-02-15";
    if (id >= 6800000) return "2022-08-15";
    if (id >= 6640000) return "2021-10-15";
    if (id >= 6600000) return "2021-07-15";
    if (id >= 6550000) return "2021-03-15";
    if (id >= 6470000) return "2020-08-15";
    if (id >= 6450000) return "2020-07-15";
    if (id >= 6380000) return "2020-06-15";
  }
  if (url.includes("hurriyet")) {
    if (id >= 42200000) return "2023-05-15";
    if (id >= 41900000) return "2021-11-15";
    if (id >= 41700000) return "2021-06-15";
    if (id >= 41600000) return "2021-04-15";
  }
  if (url.includes("cumhuriyet")) {
    if (id >= 2050000) return "2022-07-15";
    if (id >= 2020000) return "2022-05-15";
    if (id >= 1880000) return "2020-06-15";
  }
  if (url.includes("yeniakit") && id >= 1700000) return "2023-01-15";
  if (url.includes("yenigungazetesi")) {
    if (id >= 100000) return "2023-06-15";
    if (id >= 80000) return "2023-03-15";
    if (id >= 50000) return "2022-08-15";
  }
  if (url.includes("posta")) return "2022-08-15";
  if (url.includes("iha")) return "2023-02-15";
  return "2022-01-15";
}

function slugFromUrl(url) {
  const u = new URL(url);
  const host = u.hostname.replace("www.", "").split(".")[0];
  const parts = u.pathname.split("/").filter(Boolean);
  const last = (parts[parts.length - 1] || "haber")
    .replace(/\.html?$/i, "")
    .toLowerCase();
  return `${host}-${last}`
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

function excerptOf(e, finalUrl) {
  e = decode(e).replace(/^\.\.\.$/, "").trim();
  if (
    !e ||
    e.length < 40 ||
    /yenigungazetesi\.net\/?$/i.test(finalUrl || "") ||
    /^Ana Sayfa/i.test(e)
  ) {
    return "Şule Alp’in yer aldığı basın haberinin orijinal kaynağına buradan ulaşabilirsiniz.";
  }
  if (e.length > 180) return `${e.slice(0, 177)}…`;
  return e;
}

const skip = /duman/i;
const items = [];
const seen = new Set();
const skipped = [];

for (let i = 0; i < data.urls.length; i++) {
  const url = data.urls[i];
  const r = data.results[i];
  if (!r) continue;
  if (skip.test(url) || skip.test(r.title || "")) {
    skipped.push(url);
    continue;
  }
  if (seen.has(url)) continue;
  seen.add(url);

  const redirectedHome =
    r.url.replace(/\/$/, "") !== url.replace(/\/$/, "") &&
    /yenigungazetesi\.net\/?$/i.test(r.url);

  items.push({
    slug: slugFromUrl(url),
    title: cleanTitle(redirectedHome ? "" : r.title, url),
    publication: publication(url),
    date: idDate(url),
    category: "haber",
    url,
    excerpt: excerptOf(redirectedHome ? "" : r.excerpt, r.url),
  });
}

items.sort(
  (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "tr"),
);

fs.writeFileSync(
  "scripts/press-items-generated.json",
  JSON.stringify({ items, skipped }, null, 2),
);
console.log("items", items.length, "skipped", skipped.length);

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

const featured = `  {
    slug: "kentler-donusuyor-cnbc-e",
    title: "Kentsel Dönüşümün Nabzı Yaz Boyunca CNBC-e Ekranlarında",
    publication: "Konut Trend",
    date: "2025-06-25",
    category: "haber",
    url: "https://www.konuttrend.com/kentsel-donusumun-nabzi-yaz-boyunca-cnbc-e-ekranlarinda-atacak",
    image: "/images/press/kentler-donusuyor.jpg",
    excerpt:
      "Gayrimenkul Uzmanı Şule Alp’in sunduğu “Kentler Dönüşüyor” programı, yaz boyunca CNBC-e ekranlarında izleyiciyle buluşuyor.",
    body: [
      "CNBC-e’de yayınlanan “Kentler Dönüşüyor” programının sunuculuğunu Gayrimenkul Uzmanı Şule Alp üstleniyor.",
      "Program; kentsel dönüşüm projeleri, şehir planlama stratejileri, gayrimenkul yatırımları ve yeni nesil yaşam alanlarını ele alıyor.",
      "Yayın akışı: Cumartesi 14.30 ve Pazar 09.30.",
    ],
    featured: true,
  },
  {
    slug: "kentler-donusuyor-ekoyapi",
    title: "Kentsel Dönüşümün Nabzı Ekranlarda Atacak",
    publication: "Eko Yapı Dergisi",
    date: "2025-06-25",
    category: "haber",
    url: "https://www.ekoyapidergisi.org/kentsel-donusumun-nabzi-ekranlarda-atacak",
    image: "/images/press/kentler-donusuyor.jpg",
    excerpt:
      "Şule Alp’in sunduğu program; mimarlar, plancılar, sektör temsilcileri ve akademisyenleri dönüşümün perde arkasına taşıyor.",
    featured: true,
  },
  {
    slug: "klass-magazin-cnbc-e",
    title: "Lüks Gayrimenkul Uzmanı Şule Alp CNBC-e Ekranlarında",
    publication: "KLASS Magazin",
    date: "2025-06-25",
    category: "roportaj",
    url: "https://www.klassmagazin.com/cemiyet-ve-is-dunyasinin-basarili-ismi-luks-gayrimenkul-uzmani-sule-alp-yaz-boyunca-cnbc-e-ekranlarinda-olacak",
    image: "/images/press/kentler-donusuyor.jpg",
    excerpt:
      "Kentlerin değişen silueti ve sektörün geleceği, Şule Alp’in sunduğu “Kentler Dönüşüyor” ile ekranlara taşınıyor.",
    featured: true,
  },
  {
    slug: "kentler-donusuyor-program",
    title: "Kentler Dönüşüyor — Program Tanıtımı",
    publication: "CNBC-e",
    date: "2025-06-01",
    category: "televizyon",
    url: "https://www.konuttrend.com/kentsel-donusumun-nabzi-yaz-boyunca-cnbc-e-ekranlarinda-atacak",
    image: "/images/press/kentler-donusuyor.jpg",
    excerpt:
      "Kentsel dönüşüm, planlama ve yatırım gündemini ele alan televizyon programı.",
    body: [
      "“Kentler Dönüşüyor”, Türkiye’de hız kazanan kentsel dönüşüm sürecini ekrana taşıyan bir CNBC-e programıdır.",
      "Sunuculuğunu Gayrimenkul Uzmanı Şule Alp yürütmektedir.",
    ],
  },`;

const archive = items
  .map((item) => {
    return `  {
    slug: '${esc(item.slug)}',
    title: '${esc(item.title)}',
    publication: '${esc(item.publication)}',
    date: '${item.date}',
    category: 'haber',
    url: '${esc(item.url)}',
    excerpt:
      '${esc(item.excerpt)}',
  }`;
  })
  .join(",\n");

const file = `export type PressCategory = "televizyon" | "roportaj" | "haber" | "makale";

export type PressItem = {
  slug: string;
  title: string;
  publication: string;
  date: string; // ISO — yaklaşık arşiv tarihi (doğrulama TODO)
  category: PressCategory;
  url: string;
  image?: string;
  excerpt: string;
  body?: string[];
  featured?: boolean;
};

export const pressCategoryLabels: Record<PressCategory | "all", string> = {
  all: "Tümü",
  televizyon: "Televizyon",
  roportaj: "Röportaj",
  haber: "Haber",
  makale: "Makale",
};

export const pressItems: PressItem[] = [
${featured}
${archive},
];

export function getPressBySlug(slug: string) {
  return pressItems.find((p) => p.slug === slug);
}

export function getFeaturedPress(limit = 3) {
  return pressItems.filter((p) => p.featured).slice(0, limit);
}
`;

fs.writeFileSync("data/press.ts", file);
console.log("wrote data/press.ts with", 4 + items.length, "items");
