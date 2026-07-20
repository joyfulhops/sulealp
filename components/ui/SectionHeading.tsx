type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: Props) {
  const Heading = as;
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className={`${as === "h1" ? "h1" : "h2"} mt-4 text-ink`}>
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-[65ch] text-[16px] leading-[1.65] font-normal text-muted md:text-[17px] xl:text-[18px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
