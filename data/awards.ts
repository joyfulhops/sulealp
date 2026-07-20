export type Award = {
  year?: string;
  title: string;
  organization: string;
  verified: boolean;
};

export const awards: Award[] = [
  {
    title: "Yılın En İyi Satış ve Pazarlama Koordinatörü",
    organization: "Golden Palm Awards",
    verified: true,
  },
  {
    title: "Yılın En İyi Satış ve Pazarlama Koordinatörü",
    organization: "Klass Magazin",
    verified: true,
  },
  {
    title: "Yılın En İyi Satış ve Pazarlama Direktörü",
    organization: "VIP Turkey",
    verified: true,
  },
  {
    title: "Yılın En İyi Satış ve Pazarlama Direktörü",
    organization: "Protokol Dergisi",
    verified: true,
  },
  {
    title: "Yılın En İyi Satış ve Pazarlama Direktörü",
    organization: "Türk İş Kadınları",
    verified: true,
  },
];
