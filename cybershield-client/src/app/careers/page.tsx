
import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers - Abhaya IT Solutions",
  description:
    "Join our team of experts and make a difference in the world of cybersecurity and IT.",
};

export default function Careers() {
    return <CareersClient />;
}
