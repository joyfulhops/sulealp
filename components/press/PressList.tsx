"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  pressCategoryLabels,
  pressItems,
  type PressCategory,
} from "@/data/press";

const filters: Array<PressCategory | "all"> = [
  "all",
  "televizyon",
  "roportaj",
  "haber",
  "makale",
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PressList() {
  const [filter, setFilter] = useState<PressCategory | "all">("all");

  const items = useMemo(() => {
    if (filter === "all") return pressItems;
    return pressItems.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div>
      <div
        className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Basın filtreleri"
      >
        {filters.map((key) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(key)}
              className={`interactive shrink-0 min-h-11 rounded-[2px] px-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA6851] focus-visible:ring-offset-2 sm:px-4 sm:text-[12px] ${
                active
                  ? "bg-accent text-white shadow-[0_1px_2px_rgba(23,20,18,0.08)] hover:bg-accent-hover"
                  : "border border-[var(--border)] bg-white text-ink hover:border-accent hover:bg-surface/60"
              }`}
            >
              {pressCategoryLabels[key]}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.slug}
            className="group flex h-full flex-col border border-[var(--border)] bg-white transition-[border-color,box-shadow] duration-200 ease-out hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:shadow-[0_8px_24px_rgba(23,20,18,0.06)]"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-surface">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(145deg,#EFE7DD_0%,#F8F4EE_55%,#E8DFD4_100%)] px-6 text-center">
                  <span className="font-serif text-[1.75rem] tracking-[-0.02em] text-ink/80">
                    {item.publication}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                    Basında
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-2 text-[12px]">
                <span className="font-semibold tracking-[0.12em] text-accent uppercase">
                  {item.publication}
                </span>
                <span className="text-muted">·</span>
                <span className="text-muted">
                  {pressCategoryLabels[item.category]}
                </span>
              </div>
              <h2 className="mt-2 h3 text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{formatDate(item.date)}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {item.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex min-h-11 text-[12px] font-semibold tracking-[0.12em] text-accent uppercase"
                >
                  Kaynağı Aç →
                </a>
                {item.body ? (
                  <Link
                    href={`/basinda/${item.slug}`}
                    className="link-underline inline-flex min-h-11 text-[12px] font-semibold tracking-[0.12em] text-ink uppercase hover:text-accent"
                  >
                    Özeti Oku →
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-muted">Bu kategoride içerik bulunmuyor.</p>
      ) : null}
    </div>
  );
}
