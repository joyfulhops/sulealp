import Image from "next/image";
import { SignatureMark } from "@/components/brand/BrandMark";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

export default function AboutTeaser() {
  const [lead, ...rest] = siteConfig.aboutShort;

  return (
    <section className="about-teaser bg-ivory py-14 md:py-[72px] lg:py-[88px]">
      <Container className="about-teaser-grid">
        <div className="about-teaser-media min-w-0">
          <div className="about-teaser-photo">
            <Image
              src="/images/sule-alp-portrait.jpg"
              alt="Şule Alp"
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1023px) 90vw, 42vw"
            />
          </div>
        </div>

        <div className="about-teaser-copy min-w-0">
          <Reveal>
            <p className="eyebrow">Hakkında</p>

            <h2 className="h2 mt-3 text-ink md:mt-4">Şule Alp Kimdir?</h2>

            <div className="about-teaser-body">
              <p>{lead}</p>
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <blockquote className="about-teaser-quote">
              <p>“{siteConfig.quote}”</p>
              <SignatureMark className="about-teaser-signature" />
            </blockquote>

            <div className="about-teaser-cta">
              <Button
                href="/hakkinda"
                variant="secondary"
                className="about-teaser-btn"
              >
                Şule Alp’i Daha Yakından Tanıyın
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
