import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="section-y bg-ivory pt-[calc(var(--header-h)+4rem)]">
      <Container className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 h1 text-ink">
          Sayfa bulunamadı
        </h1>
        <p className="mt-4 text-muted">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="/" className="w-full sm:w-auto">
            Ana Sayfaya Dön
          </Button>
          <Button href="/iletisim" variant="secondary" className="w-full sm:w-auto">
            İletişim
          </Button>
        </div>
      </Container>
    </section>
  );
}
