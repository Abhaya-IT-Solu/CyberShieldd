import ServicesClient from './ServicesClient'
import type { Metadata } from "next";
import { brand } from "@/config/brand";

const description =
  "Enterprise-grade cybersecurity, software engineering, and managed IT services.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: `Services | ${brand.name}`, description, url: "/services" },
};


export default function Services(){
   return <ServicesClient/>
}