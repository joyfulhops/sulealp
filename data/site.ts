export const siteConfig = {
  name: "Şule Alp",
  legalName: "Şule Alp",
  tagline: "Gayrimenkul · Yatırım · Kentsel Dönüşüm",
  titleDefault: "Şule Alp | Gayrimenkul ve Yatırım Danışmanı",
  descriptionDefault:
    "Şule Alp’in lüks gayrimenkul, yatırım stratejisi ve kentsel dönüşüm alanındaki deneyimini, hizmetlerini ve basın çalışmalarını keşfedin.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sulealp.com",
  locale: "tr_TR",
  language: "tr",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "alpsule@hotmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+90 533 779 92 97",
  phoneHref:
    process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF ?? "tel:+905337799297",
  address: {
    locality: "İstanbul",
    country: "Türkiye",
    // TODO: doğrulanmış açık adres
    streetAddress: "",
  },
  social: {
    linkedin: "", // TODO
    instagram: "", // TODO
    youtube: "", // TODO
  },
  program: {
    name: "Kentler Dönüşüyor",
    network: "CNBC-e",
    schedule: "Cumartesi 14.30 · Pazar 09.30",
  },
  nav: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/hakkinda", label: "Hakkında" },
    { href: "/hizmetler", label: "Hizmetler" },
    { href: "/kentsel-donusum", label: "Kentsel Dönüşüm" },
    { href: "/basinda", label: "Basında" },
    { href: "/iletisim", label: "İletişim" },
  ],
  legal: [
    { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
    { href: "/kvkk-aydinlatma-metni", label: "KVKK Aydınlatma Metni" },
    { href: "/cerez-politikasi", label: "Çerez Politikası" },
  ],
  trustPoints: [
    {
      title: "Üst Düzey Satış ve Pazarlama Deneyimi",
      description:
        "Lüks gayrimenkul ve seçkin portföylerde satış–pazarlama odaklı danışmanlık yaklaşımı.",
    },
    {
      title: "Kentsel Dönüşümde Medya Görünürlüğü",
      description:
        "CNBC-e ekranlarında “Kentler Dönüşüyor” programı sunuculuğu ile sektör gündemini takip eder.",
    },
    {
      title: "Lüks Konut ve Yatırım Uzmanlığı",
      description:
        "Yüksek değerli konut ve stratejik yatırım kararlarında analiz odaklı rehberlik.",
    },
    {
      title: "Kurumsal Yönetim Tecrübesi",
      description:
        "Profilo, Birtur, Mesa ve Besa Holding’de üst düzey satış, pazarlama ve icra kurulu deneyimi.",
    },
  ],
  aboutShort: [
    "Şule Alp, gayrimenkul sektöründe satış, pazarlama, yatırım danışmanlığı ve kurumsal yönetim alanlarında uzun yıllara dayanan deneyime sahip bir profesyoneldir.",
    "Türkiye’nin önde gelen holdinglerinde üst düzey yöneticilik görevleri üstlenmiş; bugün CNBC-e’de “Kentler Dönüşüyor” programını sunmakta ve yatırımcılara özel danışmanlık vermektedir.",
  ],
  quote:
    "Gayrimenkul yalnızca bugünün değil, yarının da en güçlü yatırım araçlarından biridir. Doğru karar ise bilgi, deneyim ve güvenle şekillenir.",
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
