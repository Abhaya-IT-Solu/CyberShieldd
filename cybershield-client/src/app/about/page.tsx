import AboutClient from "./AboutClient";
import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${brand.name}, our approach, and the people behind it.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${brand.name}`,
    description: `Learn about ${brand.name}, our approach, and the people behind it.`,
    url: "/about",
  },
};

export default function About() {
  return <AboutClient />;
}
