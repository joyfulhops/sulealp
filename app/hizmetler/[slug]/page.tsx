import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceBySlug, services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/hizmetler/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hizmetler", path: "/hizmetler" },
            { name: service.title, path: `/hizmetler/${service.slug}` },
          ]),
        ])}
      />

      <section className="section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
        <Container className="max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Hizmetler", href: "/hizmetler" },
              { label: service.title },
            ]}
          />
          <p className="eyebrow">Hizmet</p>
          <h1 className="h1 mt-3 text-ink">{service.h1}</h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted md:text-[17px]">
            {service.intro}
          </p>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h2 text-ink">Kimler için uygun?</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {service.suitableFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2 text-ink">Hizmet kapsamı</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {service.scope.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-y bg-ivory">
        <Container>
          <h2 className="h2 text-ink">Süreç nasıl işler?</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {service.process.map((step, i) => (
              <li key={step.title} className="border border-[var(--border)] bg-white p-5 sm:p-6">
                <p className="text-[12px] font-semibold tracking-[0.12em] text-accent uppercase">
                  0{i + 1}
                </p>
                <h3 className="h3 mt-2 text-ink">{step.title}</h3>
                <p className="mt-3 text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container className="max-w-3xl">
          <h2 className="h2 text-ink">Beklenen çıktı</h2>
          <ul className="mt-5 space-y-3 text-muted">
            {service.outcomes.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="h2 mt-14 text-ink">Sık sorulan sorular</h2>
          <div className="mt-6 space-y-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="border border-[var(--border)] bg-ivory p-4 transition-[border-color] duration-200 open:border-accent/40 sm:p-5"
              >
                <summary className="interactive-icon min-h-11 list-none py-1 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 w-full">
            <Button href="/iletisim" className="w-full sm:w-auto">
              Bu Hizmet İçin Görüşme Talep Et
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
