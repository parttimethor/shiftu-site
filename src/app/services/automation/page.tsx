import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";
import { servicesData } from "@/lib/services-data";

const d = servicesData["automation"];
export const metadata: Metadata = { title: d.label, description: d.metaDesc };

export default function Page() {
  return <ServiceTemplate slug="automation" />;
}
