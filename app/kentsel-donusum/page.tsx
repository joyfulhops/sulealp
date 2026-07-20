import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import { getFeaturedPress } from "@/data/press";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Kentsel Dönüşüm | Şule Alp",
  description:
    "Kentler Dönüşüyor programı ve kentsel dönüşüm danışmanlığı yaklaşımı: hak sahipleri, yatırımcılar ve medya çalışmaları.",
  path: "/kentsel-donusum",
});

export default function UrbanPage() {
  const press = getFeaturedPress(3);

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Kentsel Dönüşüm", path: "/kentsel-donusum" },
          ]),
        ])}
      />

      <section className="relative min-h-[420px] overflow-hidden pt-[var(--header-h)] md:min-h-[480px] lg:min-h-[560px]">
        <div className="absolute inset-0">
          <Image
            src="/images/urban-transformation.jpg"
            alt="Kentsel dönüşüm ve şehir silüeti"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <Container className="relative z-10 flex min-h-[inherit] items-center py-16 md:py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow text-beige">Kentsel Dönüşüm</p>
            <h1 className="mt-3 h1 text-white">
              Kentsel Dönüşümde Vizyon
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/85 md:mt-6 md:text-[17px] lg:text-[18px]">
              Şehirlerin yeniden şekillendiği süreçte doğru bilgi, doğru
              zamanlama ve şeffaf iletişim; hem hak sahipleri hem yatırımcılar
              için kritik hale gelir.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-y bg-ivory">
        <Container className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              title="Program ve Medya Çalışmaları"
              description={`${siteConfig.program.network} ekranlarında “${siteConfig.program.name}” programı; kentsel dönüşüm projeleri, planlama stratejileri ve yatırım gündemini ele alır. Yayın: ${siteConfig.program.schedule}.`}
            />
          </div>
          <div className="min-w-0 space-y-4 text-[16px] leading-relaxed text-muted md:text-[17px]">
            <p>
              Programda mimarlar, şehir plancıları, sektör temsilcileri, belediye
              yetkilileri ve akademisyenler dönüşümün perde arkasını paylaşır.
            </p>
            <p>
              Amaç; yalnızca büyükşehirleri değil, Anadolu’daki dönüşüm
              hikâyelerini de görünür kılarak hukuki, finansal ve teknik boyutu
              anlaşılır hale getirmektir.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <h2 className="h2 text-ink">
            Proje ve Yatırım Perspektifi
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {[
              {
                title: "Hak sahipleri",
                text: "Süreç adımlarını sadeleştirmek, karar noktalarını görünür kılmak ve adil değer çerçevesinde yönlendirme.",
              },
              {
                title: "Yatırımcılar",
                text: "Risk, zamanlama ve proje kalitesini birlikte değerlendirerek bilinçli yatırım kararları desteklemek.",
              },
              {
                title: "Kamuoyu bilgilendirme",
                text: "Medya aracılığıyla dönüşüm gündemini anlaşılır, güncel ve rehber niteliğinde aktarmak.",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="min-w-0 border border-[var(--border)] bg-ivory p-6 lg:p-7"
              >
                <h3 className="h3 text-ink">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-[16px]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-ivory">
        <Container>
          <h2 className="h2 text-ink">
            Konuşma, Panel ve Danışmanlık
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Panel, yayın ve özel danışmanlık talepleri için iletişime geçebilirsiniz.
            Kentsel dönüşüm danışmanlığı hizmet detayına da göz atabilirsiniz.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 md:flex-row">
            <Button
              href="/hizmetler/kentsel-donusum-danismanligi"
              className="w-full md:w-auto lg:whitespace-nowrap"
            >
              Danışmanlık Detayı
            </Button>
            <Button
              href="/iletisim"
              variant="secondary"
              className="w-full md:w-auto lg:whitespace-nowrap"
            >
              Konuşma / Panel Talebi
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <h2 className="h2 text-ink">
            Basındaki İlgili İçerikler
          </h2>
          <ul className="mt-8 space-y-4">
            {press.map((item) => (
              <li
                key={item.slug}
                className="flex flex-col gap-2 border border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.12em] text-accent uppercase">
                    {item.publication}
                  </p>
                  <p className="mt-1 font-medium text-ink">{item.title}</p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex min-h-11 text-[12px] font-semibold tracking-[0.12em] text-ink uppercase hover:text-accent"
                >
                  Haberi Aç →
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/basinda" className="link-underline text-accent">
              Tüm basın içerikleri
            </Link>
          </p>
        </Container>
      </section>

      <section className="bg-surface section-y">
        <Container className="flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-center">
          <h2 className="max-w-xl h2 text-ink">
            Kentsel dönüşüm süreciniz için görüşelim
          </h2>
          <Button
            href="/iletisim"
            className="w-full shrink-0 md:w-auto lg:whitespace-nowrap"
          >
            Özel Görüşme Talep Et
          </Button>
        </Container>
      </section>
    </>
  );
}
