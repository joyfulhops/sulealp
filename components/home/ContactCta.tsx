import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

export default function ContactCta() {
  return (
    <section className="bg-surface py-14 md:py-[var(--section-y)]">
      <Container className="grid items-center gap-8 md:gap-10 lg:grid-cols-[1.3fr_1fr_auto]">
        <Reveal>
          <h2 className="font-serif text-[2rem] leading-[1.12] font-normal tracking-[-0.02em] text-ink md:h2">
            Doğru Zamanda, Doğru Karar İçin Görüşelim
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted md:text-[16px]">
            Özel görüşme talebinizi iletin; hedeflerinize uygun bir yol haritası
            oluşturalım.
          </p>
        </Reveal>
        <Reveal>
          <ul className="space-y-1 text-[15px] text-muted">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="tap-link inline-flex min-h-11 items-center text-ink"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="tap-link inline-flex min-h-11 items-center break-all text-ink"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-1 text-[14px] text-muted">
              {siteConfig.address.locality}, {siteConfig.address.country}
            </li>
          </ul>
        </Reveal>
        <Reveal className="w-full lg:w-auto">
          <Button
            href="/iletisim"
            className="!h-[52px] !min-h-[52px] w-full !px-6 lg:w-auto"
          >
            Özel Görüşme Talep Et
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}