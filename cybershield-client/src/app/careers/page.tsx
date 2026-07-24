
import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { brand } from "@/config/brand";

const description =
  "Join our team of experts and make a difference in the world of cybersecurity and IT.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: { title: `Careers | ${brand.name}`, description, url: "/careers" },
};

export default function Careers() {
    return <CareersClient />;
}
