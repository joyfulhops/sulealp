import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getFeaturedPress } from "@/data/press";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PressTeaser() {
  const items = getFeaturedPress(3);

  return (
    <section className="section-y bg-ivory">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Medya"
            title="Basında Şule Alp"
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Reveal key={item.slug}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-card bg-white"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-surface">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      width={1200}
                      height={800}
                      className="card-media h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[12px] font-semibold tracking-[0.12em] text-accent uppercase">
                    {item.publication}
                  </p>
                  <h3 className="mt-2 h3 text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{formatDate(item.date)}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {item.excerpt}
                  </p>
                  <span className="link-underline mt-5 inline-flex min-h-11 text-[12px] font-semibold tracking-[0.12em] text-ink uppercase">
                    Haberi Oku →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/basinda" variant="ghost" className="w-full sm:w-auto">
            Tüm Haberleri Görüntüle
          </Button>
        </div>
      </Container>
    </section>
  );
}
