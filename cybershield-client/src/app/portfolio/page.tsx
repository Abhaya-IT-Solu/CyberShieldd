import PortfolioClient from "./PortfolioClient";
import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `A selection of projects and case studies from ${brand.name}.`,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: `Portfolio | ${brand.name}`,
    description: `A selection of projects and case studies from ${brand.name}.`,
    url: "/portfolio",
  },
};

export default function Portfolio() {
  return <PortfolioClient />;
}
