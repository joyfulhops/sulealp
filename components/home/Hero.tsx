import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="hero-seamless relative overflow-x-clip">
      {/* Desktop villa */}
      <div className="hero-media" aria-hidden>
        <div className="hero-media-frame">
          <Image
            src="/images/hero-villa-sunset.jpg"
            alt=""
            fill
            priority
            className="hero-photo object-cover object-[64%_center]"
            sizes="72vw"
            quality={94}
          />
        </div>
      </div>

      <div className="hero-color-bridge" aria-hidden />

      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow hero-fade">Doğru Zaman. Doğru Karar.</p>

          <h1 className="hero-fade hero-fade-1 hero-title-seamless font-serif font-light text-ink">
            <span className="block">Yüksek Değerli Gayrimenkul</span>
            <span className="block">ve Stratejik Yatırım</span>
            <span className="block">Danışmanlığı</span>
          </h1>

          <span className="hero-rule hero-fade hero-fade-1" aria-hidden />

          <p className="hero-lead hero-fade hero-fade-2">
            Vizyoner bakış, güçlü analiz ve deneyimle yatırımlarınızı koruyor,
            geleceğe değer katıyoruz.
          </p>

          <div className="hero-actions hero-fade hero-fade-3">
            <Button href="/iletisim" className="hero-btn-primary">
              Özel Görüşme Talep Et
            </Button>
            <Button
              href="/hakkinda"
              variant="secondary"
              className="hero-btn-secondary"
            >
              Şule Alp’i Tanıyın
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet image under copy — clean, readable */}
      <div className="hero-mobile-shot">
        <div className="hero-mobile-shot-frame">
          <Image
            src="/images/hero-villa-sunset-mobile.jpg"
            alt="Gün batımında taş ve ahşap detaylı lüks villa"
            fill
            priority
            className="hero-photo object-cover object-[64%_center]"
            sizes="100vw"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
