import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  href?: string | null;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
};

const sizeMap = {
  sm: {
    width: 240,
    height: 86,
    /* Locked: mobile 48 → tablet 58 → desktop 66 */
    imgClass: "h-[var(--logo-h)] w-auto max-w-[min(100%,200px)] lg:max-w-none",
    tagline: "text-[9px] tracking-[0.14em] md:text-[10px]",
    gap: "gap-1",
  },
  md: {
    width: 220,
    height: 78,
    imgClass: "h-[56px] w-auto md:h-[64px]",
    tagline: "text-[10px] tracking-[0.14em]",
    gap: "gap-1.5",
  },
  lg: {
    width: 300,
    height: 106,
    imgClass: "h-[80px] w-auto md:h-[92px]",
    tagline: "text-[10px] tracking-[0.16em]",
    gap: "gap-2",
  },
};

export default function BrandMark({
  href = "/",
  variant = "dark",
  size = "md",
  showTagline = false,
  className = "",
}: BrandMarkProps) {
  const s = sizeMap[size];
  const muted = variant === "light" ? "text-[#CDBAA4]" : "text-[#6E655E]";
  const src =
    variant === "light"
      ? "/images/signature-light.png"
      : "/images/signature.png";

  const content = (
    <span className={`inline-flex flex-col items-start ${s.gap} ${className}`}>
      <Image
        src={src}
        alt="Şule Alp"
        width={s.width}
        height={s.height}
        className={`${s.imgClass} object-contain object-left`}
        priority={size === "sm"}
      />
      {showTagline ? (
        <span
          className={`max-w-[15rem] font-sans font-medium leading-snug uppercase ${s.tagline} ${muted}`}
        >
          Gayrimenkul · Yatırım · Kentsel Dönüşüm
        </span>
      ) : null}
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      className="interactive-icon inline-flex items-center"
      aria-label="Şule Alp ana sayfa"
    >
      {content}
    </Link>
  );
}

export function SignatureMark({
  className = "",
}: {
  variant?: "dark" | "light" | "accent";
  className?: string;
}) {
  return (
    <Image
      src="/images/signature.png"
      alt="Şule Alp imzası"
      width={360}
      height={130}
      className={`h-auto w-auto max-w-[200px] object-contain object-center md:max-w-[280px] ${className}`}
    />
  );
}
