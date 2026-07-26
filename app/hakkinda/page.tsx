import Image from "next/image";
import Link from "next/link";
import { SignatureMark } from "@/components/brand/BrandMark";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/seo/JsonLd";
import { aboutPage } from "@/data/about";
import { awards } from "@/data/awards";
import { getFeaturedPress } from "@/data/press";
import { siteConfig } from "@/data/site";
import { timeline } from "@/data/timeline";
import { trainings } from "@/data/training";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";
import {
  aboutPageSchema,
  breadcrumbSchema,
  jsonLdGraph,
  organizationSchema,
  personSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Şule Alp Kimdir? | Gayrimenkul ve Yatırım Danışmanı",
  description:
    "Şule Alp kimdir? Gayrimenkul, yatırım danışmanlığı, satış ve pazarlama yönetimi, kentsel dönüşüm ve CNBC-e Kentler Dönüşüyor programı sunucusu hakkında resmi biyografi.",
  path: "/hakkinda",
  image: "/images/sule-alp-portrait.jpg",
});

export default function AboutPage() {
  const press = getFeaturedPress(3);

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hakkında", path: "/hakkinda" },
          ]),
          aboutPageSchema(),
          {
            "@type": "ProfilePage",
            "@id": absoluteUrl("/hakkinda#profile"),
            url: absoluteUrl("/hakkinda"),
            name: "Şule Alp Kimdir?",
            mainEntity: { "@id": absoluteUrl("/#person") },
            about: { "@id": absoluteUrl("/#person") },
          },
          personSchema(),
          organizationSchema(),
        ])}
      />

      {/* 1. Kısa Biyografi */}
      <section className="bg-ivory pt-[calc(var(--header-h)+2.5rem)] pb-16 md:pb-20 lg:pb-24">
        <Container className="grid items-start gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Desktop: photo left. Mobile/tablet: bio first, then photo */}
          <aside className="order-2 min-w-0 lg:order-1 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden border border-[var(--border)] bg-surface lg:mx-0 lg:max-w-none">
                <Image
                  src="/images/sule-alp-portrait.jpg"
                  alt="Şule Alp"
                  fill
                  priority
                  className="object-cover object-[center_12%]"
                  sizes="(max-width: 1023px) 90vw, 40vw"
                />
              </div>
              <div className="mt-7 flex w-full flex-col items-center text-center">
                <p className="max-w-[22rem] font-serif text-[18px] leading-[1.5] text-[#2A2623] italic md:text-[20px] lg:text-[22px]">
                  “{aboutPage.photoQuote}”
                </p>
                <SignatureMark className="mx-auto mt-4 !max-w-[150px] md:!max-w-[170px] lg:!max-w-[204px]" />
              </div>
            </div>
          </aside>

          <div className="order-1 min-w-0 lg:order-2 lg:col-span-7">
            <div className="max-w-[680px] lg:max-w-[720px]">
              <p className="eyebrow">{aboutPage.eyebrow}</p>
              <h1 className="h1 mt-3 text-ink md:mt-4">{aboutPage.title}</h1>
              <p className="mt-5 text-[17px] leading-[1.55] text-[#5E5650] md:text-[18px]">
                {aboutPage.lead}
              </p>
              <div className="mt-8 space-y-7 text-[16px] leading-[1.7] text-muted md:mt-9 md:space-y-8 md:text-[17px] lg:text-[18px]">
                {aboutPage.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Kariyer Yolculuğu */}
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <Container>
          <div className="max-w-[720px]">
            <h2 className="h2 text-ink">Kariyer Yolculuğu</h2>
            <ol className="mt-10 space-y-9 border-l border-[rgba(170,104,81,0.22)] pl-8">
              {timeline.map((item) => (
                <li key={`${item.period}-${item.title}`} className="relative">
                  <span
                    className="absolute top-2 -left-[2.15rem] h-2.5 w-2.5 rounded-full bg-accent"
                    aria-hidden
                  />
                  <p className="text-[12px] font-semibold tracking-[0.14em] text-accent uppercase">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.5rem] leading-tight font-normal text-ink md:text-[1.65rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[36rem] text-[16px] leading-[1.65] text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 3. Uzmanlık Alanları */}
      <section className="bg-ivory py-16 md:py-20 lg:py-24">
        <Container>
          <h2 className="h2 max-w-[720px] text-ink">Uzmanlık Alanları</h2>
          <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
            {aboutPage.expertise.map((item) => (
              <li
                key={item}
                className="border-t border-[rgba(170,104,81,0.2)] pt-4 text-[15px] leading-snug text-ink md:text-[16px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4. Eğitimler */}
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <Container className="max-w-[720px]">
          <h2 className="h2 text-ink">Eğitimler</h2>

          <div className="mt-10 space-y-8">
            {aboutPage.education.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-[1.35rem] font-normal text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] text-muted">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-14 font-serif text-[1.5rem] font-normal text-ink md:text-[1.65rem]">
            Mesleki Eğitimler
          </h3>
          <ul className="mt-6 columns-1 gap-x-12 space-y-3 sm:columns-2">
            {trainings.map((t) => (
              <li
                key={t.title}
                className="break-inside-avoid text-[15px] leading-[1.55] text-[#5E5650]"
              >
                {t.title}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. Ödüller */}
      <section className="bg-ivory py-16 md:py-20 lg:py-24">
        <Container className="max-w-[720px]">
          <h2 className="h2 text-ink">Ödüller</h2>
          <p className="mt-5 max-w-[40rem] text-[16px] leading-[1.65] text-muted">
            Profesyonel kariyeri boyunca satış ve pazarlama alanındaki
            başarıları çeşitli kurumlar tarafından ödüllendirilmiştir.
          </p>
          <ul className="mt-10 space-y-7">
            {awards.map((a) => (
              <li
                key={`${a.organization}-${a.title}`}
                className="border-t border-[rgba(170,104,81,0.18)] pt-5"
              >
                <p className="font-serif text-[1.25rem] leading-snug text-ink">
                  {a.title}
                </p>
                <p className="mt-2 text-[13px] tracking-[0.08em] text-muted uppercase">
                  {a.organization}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6. Basında Şule Alp */}
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-[720px]">
              <h2 className="h2 text-ink">Basında Şule Alp</h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-muted md:text-[17px]">
                {aboutPage.pressLead} Yayın akışı:{" "}
                {siteConfig.program.schedule}.
              </p>
            </div>
            <Link
              href="/basinda"
              className="link-underline text-[12px] font-semibold tracking-[0.12em] text-accent uppercase"
            >
              Tümünü Gör →
            </Link>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {press.map((item) => (
              <a
                key={item.slug}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <p className="text-[12px] font-semibold tracking-[0.14em] text-accent uppercase">
                  {item.publication}
                </p>
                <h3 className="mt-3 font-serif text-[1.35rem] leading-snug font-normal text-ink transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.excerpt}
                </p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. İletişim CTA */}
      <section className="bg-ivory py-16 md:py-20 lg:py-24">
        <Container className="max-w-[720px]">
          <h2 className="h2 text-ink">Özel Görüşme</h2>
          <p className="mt-5 max-w-[36rem] text-[17px] leading-[1.65] text-muted">
            Yatırım, lüks konut veya kentsel dönüşüm süreçleriniz için Şule
            Alp ile doğrudan iletişime geçebilirsiniz.
          </p>
          <div className="mt-9 w-full">
            <Button href="/iletisim" className="w-full sm:w-auto">
              İletişime Geçin
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
