import Container from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Çerez Politikası | Şule Alp",
  description:
    "Şule Alp web sitesinde kullanılan çerezler ve benzeri teknolojilere ilişkin bilgilendirme.",
  path: "/cerez-politikasi",
});

export default function CookiePage() {
  return (
    <section className="section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
      <Container className="max-w-3xl">
        <h1 className="h1 text-ink">
          Çerez Politikası
        </h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            Bu site, temel işlevsellik ve performans ölçümü için sınırlı çerez
            veya benzeri teknolojiler kullanabilir.
          </p>
          <h2 className="pt-4 h3 text-ink">Zorunlu çerezler</h2>
          <p>
            Sitenin güvenli ve düzgün çalışması için gerekli teknik çerezler.
          </p>
          <h2 className="pt-4 h3 text-ink">
            Analitik çerezler
          </h2>
          <p>
            TODO: Google Analytics 4 eklendiğinde burada açıklanacak. Şu an
            analitik çerez aktif değildir.
          </p>
          <h2 className="pt-4 h3 text-ink">Yönetim</h2>
          <p>
            Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz.
            Zorunlu çerezlerin engellenmesi bazı işlevleri etkileyebilir.
          </p>
        </div>
      </Container>
    </section>
  );
}
