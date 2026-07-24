import ContactForm from "../components/Contact/index";
import PageIntro from "../components/PageIntro/index";
import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${brand.name} to discuss your project.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${brand.name}`,
    description: `Get in touch with ${brand.name} to discuss your project.`,
    url: "/contact",
  },
};

export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Reach Us"
        title={
          <>
            Let&apos;s build something
            <br />
            <span className="text-white/50">worth defending.</span>
          </>
        }
        subtitle="Tell us what you're building or securing. We reply within 24 hours."
      />
      <ContactForm />
    </>
  );
}
