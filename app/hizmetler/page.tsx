import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Hizmetler | Şule Alp",
  description:
    "Lüks konut danışmanlığı, yatırım stratejisi, kentsel dönüşüm ve özel müşteri temsili hizmetlerini keşfedin.",
  path: "/hizmetler",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hizmetler", path: "/hizmetler" },
          ]),
        ])}
      />
      <section className="section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
        <Container>
          <SectionHeading
            eyebrow="Uzmanlık Alanları"
            title="Hizmetler"
            as="h1"
            description="Yüksek değerli gayrimenkul süreçlerinde stratejik, şeffaf ve kişiye özel danışmanlık."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/hizmetler/${service.slug}`}
                className="interactive-card bg-white p-5 sm:p-7 md:p-8"
              >
                <h2 className="h2 text-ink">
                  {service.title}
                </h2>
                <p className="mt-4 flex-1 text-muted">{service.cardDescription}</p>
                <span className="link-underline mt-6 inline-flex min-h-11 text-[12px] font-semibold tracking-[0.12em] text-accent uppercase">
                  Hizmet Detayına Git →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
