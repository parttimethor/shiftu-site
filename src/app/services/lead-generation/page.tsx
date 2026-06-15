import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";
import { RadarLeadSection } from "@/components/services/RadarLeadSection";
import { servicesData } from "@/lib/services-data";

const d = servicesData["lead-generation"];
export const metadata: Metadata = { title: d.label, description: d.metaDesc };

export default function Page() {
  return <ServiceTemplate slug="lead-generation" accent={<RadarLeadSection />} />;
}
