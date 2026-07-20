import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/seo/JsonLd";
import { getPressBySlug, pressItems } from "@/data/press";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pressItems.filter((p) => p.body).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getPressBySlug(slug);
  if (!item?.body) return {};
  return buildMetadata({
    title: `${item.title} | Şule Alp`,
    description: item.excerpt,
    path: `/basinda/${item.slug}`,
    image: item.image,
  });
}

export default async function PressDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPressBySlug(slug);
  if (!item?.body) notFound();

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Basında", path: "/basinda" },
            { name: item.title, path: `/basinda/${item.slug}` },
          ]),
          articleSchema({
            headline: item.title,
            description: item.excerpt,
            path: `/basinda/${item.slug}`,
            datePublished: item.date,
            image: item.image,
          }),
        ])}
      />

      <article className="section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
        <Container className="max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Basında", href: "/basinda" },
              { label: item.title },
            ]}
          />
          <p className="eyebrow">{item.publication}</p>
          <h1 className="h1 mt-3 text-ink">{item.title}</h1>
          <p className="mt-3 text-sm text-muted">
            {new Intl.DateTimeFormat("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(item.date))}
          </p>

          {item.image ? (
            <div className="relative mt-8 aspect-[3/2] overflow-hidden border border-[var(--border)]">
              <Image
                src={item.image}
                alt=""
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="prose-sa mt-8 space-y-4 text-[17px] text-muted">
            {item.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row">
            <Button href={item.url} external className="w-full sm:w-auto">
              Orijinal Haberi Aç
            </Button>
            <Button href="/basinda" variant="secondary" className="w-full sm:w-auto">
              Tüm Basın İçerikleri
            </Button>
          </div>
        </Container>
      </article>
    </>
  );
}
