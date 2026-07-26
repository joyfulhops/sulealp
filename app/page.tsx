import AboutTeaser from "@/components/home/AboutTeaser";
import ContactCta from "@/components/home/ContactCta";
import Hero from "@/components/home/Hero";
import OpeningStatement from "@/components/home/OpeningStatement";
import PressTeaser from "@/components/home/PressTeaser";
import ServicesGrid from "@/components/home/ServicesGrid";
import TrustStrip from "@/components/home/TrustStrip";
import UrbanTeaser from "@/components/home/UrbanTeaser";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import {
  jsonLdGraph,
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: siteConfig.titleDefault,
  description: siteConfig.descriptionDefault,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          personSchema(),
          organizationSchema(),
          websiteSchema(),
        ])}
      />
      <OpeningStatement />
      <Hero />
      <TrustStrip />
      <AboutTeaser />
      <ServicesGrid />
      <UrbanTeaser />
      <PressTeaser />
      <ContactCta />
    </>
  );
}
