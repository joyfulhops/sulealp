import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Gizlilik Politikası | Şule Alp",
  description:
    "Şule Alp web sitesi gizlilik politikası: kişisel verilerin korunması ve kullanım esasları.",
  path: "/gizlilik-politikasi",
});

export default function PrivacyPage() {
  return (
    <section className="section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
      <Container className="max-w-3xl prose-sa">
        <h1 className="h1 text-ink">
          Gizlilik Politikası
        </h1>
        <p className="mt-6 text-muted">
          Bu gizlilik politikası, {siteConfig.name} web sitesini ziyaret eden
          kullanıcıların kişisel verilerinin nasıl işlendiğini açıklar.
        </p>
        <h2 className="mt-10 h3 text-ink">Toplanan veriler</h2>
        <p className="mt-3 text-muted">
          İletişim formu aracılığıyla ad soyad, e-posta, telefon, konu ve mesaj
          bilgileri toplanabilir. Sunucu logları teknik amaçlarla geçici olarak
          tutulabilir.
        </p>
        <h2 className="mt-10 h3 text-ink">Kullanım amacı</h2>
        <p className="mt-3 text-muted">
          Veriler; görüşme taleplerine yanıt vermek, bilgilendirme yapmak ve yasal
          yükümlülükleri yerine getirmek amacıyla işlenir.
        </p>
        <h2 className="mt-10 h3 text-ink">Paylaşım</h2>
        <p className="mt-3 text-muted">
          Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla
          satılmaz. Hizmet alınan altyapı sağlayıcıları (barındırma, e-posta)
          yalnızca gerekli ölçüde erişebilir.
        </p>
        <h2 className="mt-10 h3 text-ink">İletişim</h2>
        <p className="mt-3 text-muted">
          Gizlilik ile ilgili talepleriniz için{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-underline text-accent"
          >
            {siteConfig.email}
          </a>{" "}
          adresine yazabilirsiniz. Detaylar için{" "}
          <a href="/kvkk-aydinlatma-metni" className="link-underline text-accent">
            KVKK Aydınlatma Metni
          </a>
          ’ne bakınız.
        </p>
        <p className="mt-8 text-sm text-muted">
          Son güncelleme: {new Date().toISOString().slice(0, 10)}
        </p>
      </Container>
    </section>
  );
}
