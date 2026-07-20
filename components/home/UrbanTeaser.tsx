import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

export default function UrbanTeaser() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/urban-transformation.jpg"
          alt="Şehir silüeti — kentsel dönüşüm"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="relative z-10 py-14 md:py-20 lg:py-28">
        <Reveal>
          <div className="max-w-xl border border-white/10 bg-white/95 p-6 md:p-8 lg:p-10">
            <p className="eyebrow">Kentsel Dönüşüm</p>
            <h2 className="mt-3 h2 text-ink">Kentleri Dönüştüren Vizyon</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-[16px] lg:text-[17px]">
              {siteConfig.program.network} ekranlarında “
              {siteConfig.program.name}” programı ile kentsel dönüşüm, planlama
              ve yatırım gündemini izleyiciyle buluşturuyoruz.{" "}
              {siteConfig.program.schedule}.
            </p>
            <div className="mt-7 md:mt-8">
              <Button
                href="/kentsel-donusum"
                className="w-full md:w-auto lg:whitespace-nowrap"
              >
                Kentsel Dönüşüm Yaklaşımını İnceleyin
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
