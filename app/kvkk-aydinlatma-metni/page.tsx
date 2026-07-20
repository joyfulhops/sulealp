import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni | Şule Alp",
  description:
    "6698 sayılı KVKK kapsamında Şule Alp iletişim süreçlerine ilişkin aydınlatma metni.",
  path: "/kvkk-aydinlatma-metni",
});

export default function KvkkPage() {
  return (
    <section className="section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
      <Container className="max-w-3xl">
        <h1 className="h1 text-ink">
          KVKK Aydınlatma Metni
        </h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca;
            veri sorumlusu sıfatıyla {siteConfig.name}, iletişim formundan veya
            doğrudan iletişim kanallarından iletilen kişisel verilerinizi
            aşağıdaki çerçevede işlemektedir.
          </p>
          <h2 className="pt-4 h3 text-ink">
            İşlenen kişisel veriler
          </h2>
          <p>
            Kimlik (ad soyad), iletişim (telefon, e-posta) ve mesaj içeriğinde
            yer alan bilgiler.
          </p>
          <h2 className="pt-4 h3 text-ink">
            İşleme amaçları
          </h2>
          <p>
            Görüşme taleplerinin değerlendirilmesi, bilgilendirme yapılması,
            müşteri ilişkilerinin yürütülmesi ve yasal yükümlülüklerin yerine
            getirilmesi.
          </p>
          <h2 className="pt-4 h3 text-ink">Hukuki sebep</h2>
          <p>
            KVKK m.5 kapsamında ilgili kişinin açık rızası ve/veya bir sözleşmenin
            kurulması ya da ifasıyla doğrudan doğruya ilgili olması.
          </p>
          <h2 className="pt-4 h3 text-ink">Haklarınız</h2>
          <p>
            KVKK m.11 kapsamındaki haklarınızı kullanmak için{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline text-accent"
            >
              {siteConfig.email}
            </a>{" "}
            üzerinden başvurabilirsiniz.
          </p>
          <p className="pt-4 text-sm">
            TODO: Veri sorumlusu unvanı, MERSİS ve açık adres doğrulanınca
            güncellenecek.
          </p>
        </div>
      </Container>
    </section>
  );
}
