import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/metadata";

export function personSchema() {
  return {
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/images/sule-alp-portrait.jpg"),
    jobTitle: "Gayrimenkul ve Yatırım Danışmanı",
    description: siteConfig.descriptionDefault,
    worksFor: { "@id": absoluteUrl("/#organization") },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/signature.png"),
    image: absoluteUrl("/images/signature.png"),
    description: siteConfig.descriptionDefault,
    email: siteConfig.email.includes("XXX") ? undefined : siteConfig.email,
    telephone: siteConfig.phone.includes("XXX") ? undefined : siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressCountry: "TR",
      ...(siteConfig.address.streetAddress
        ? { streetAddress: siteConfig.address.streetAddress }
        : {}),
    },
    areaServed: "TR",
    founder: { "@id": absoluteUrl("/#person") },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.descriptionDefault,
    inLanguage: "tr-TR",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": absoluteUrl("/#person") },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(input.path),
    image: absoluteUrl(input.image ?? "/images/og-default.jpg"),
    inLanguage: "tr-TR",
  };
}

export function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
