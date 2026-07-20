export const contactSubjects = [
  "Özel görüşme talebi",
  "Lüks konut danışmanlığı",
  "Yatırım stratejisi",
  "Kentsel dönüşüm danışmanlığı",
  "Basın ve konuşma daveti",
  "Diğer",
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export const contactPage = {
  title: "İletişim",
  h1: "Özel Görüşme İçin İletişime Geçin",
  intro:
    "Hedefinizi, zaman planınızı ve ihtiyaç duyduğunuz danışmanlık alanını paylaşın. En kısa sürede dönüş yapılacaktır.",
  privacyNote:
    "Görüşmeler gizlilik, ihtiyaç analizi ve uzun vadeli değer yaklaşımıyla ele alınır.",
  successTitle: "Mesajınız alınmıştır.",
  successMessage:
    "Talebiniz incelendikten sonra en kısa sürede sizinle iletişime geçilecektir.",
  errorMessage:
    "Gönderim sırasında bir sorun oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
} as const;
