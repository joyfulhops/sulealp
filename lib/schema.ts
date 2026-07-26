import { aboutPage } from "@/data/about";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/metadata";

export function personSchema() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);

  return {
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteConfig.name,
    alternateName: ["Sule Alp", "Şule ALP"],
    url: absoluteUrl("/hakkinda"),
    image: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/sule-alp-portrait.jpg"),
      caption: "Şule Alp",
    },
    jobTitle: "Gayrimenkul ve Yatırım Danışmanı",
    description: aboutPage.lead,
    knowsAbout: [...aboutPage.expertise],
    knowsLanguage: ["tr", "en"],
    nationality: {
      "@type": "Country",
      name: "Türkiye",
    },
    homeLocation: {
      "@type": "Place",
      name: siteConfig.address.locality,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressCountry: "TR",
      },
    },
    alumniOf: aboutPage.education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.title,
    })),
    worksFor: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: {
      "@type": "ProfilePage",
      "@id": absoluteUrl("/hakkinda#profile"),
      url: absoluteUrl("/hakkinda"),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/signature.png"),
    image: absoluteUrl("/images/sule-alp-portrait.jpg"),
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
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    founder: { "@id": absoluteUrl("/#person") },
    employee: { "@id": absoluteUrl("/#person") },
    knowsAbout: [...aboutPage.expertise],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: siteConfig.name,
    alternateName: "Şule Alp Resmi Web Sitesi",
    description: siteConfig.descriptionDefault,
    inLanguage: "tr-TR",
    publisher: { "@id": absoluteUrl("/#organization") },
    about: { "@id": absoluteUrl("/#person") },
  };
}

export function aboutPageSchema() {
  return {
    "@type": "AboutPage",
    "@id": absoluteUrl("/hakkinda#webpage"),
    url: absoluteUrl("/hakkinda"),
    name: "Şule Alp Kimdir?",
    description: aboutPage.lead,
    inLanguage: "tr-TR",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#person") },
    mainEntity: { "@id": absoluteUrl("/#person") },
    primaryImageOfPage: absoluteUrl("/images/sule-alp-portrait.jpg"),
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
