import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="section-y bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Uzmanlık"
            title="Hizmetler"
            description="Her müvekkil için ölçülebilir değer üreten, şeffaf ve stratejik danışmanlık süreçleri."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <Link
                href={`/hizmetler/${service.slug}`}
                className="interactive-card min-w-0 bg-ivory/70 p-5 sm:p-7"
              >
                <div className="h-px w-8 bg-accent" aria-hidden />
                <h3 className="mt-6 h3 text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {service.cardDescription}
                </p>
                <span className="link-underline mt-6 inline-flex min-h-11 text-[12px] font-semibold tracking-[0.12em] text-accent uppercase">
                  Detayları İncele →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
