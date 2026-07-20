import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PressList from "@/components/press/PressList";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Basında | Şule Alp",
  description:
    "Şule Alp’in televizyon, röportaj, haber ve makale görünürlüğünü; Kentler Dönüşüyor programını ve basın bağlantılarını keşfedin.",
  path: "/basinda",
});

export default function PressPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Basında", path: "/basinda" },
          ]),
        ])}
      />
      <section className="section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
        <Container>
          <SectionHeading
            eyebrow="Medya"
            title="Basında Şule Alp"
            as="h1"
            description="Doğrulanmış haber, röportaj ve televizyon içerikleri."
          />
          <div className="mt-12">
            <PressList />
          </div>
        </Container>
      </section>
    </>
  );
}
