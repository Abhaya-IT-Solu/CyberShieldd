import OrganizationHero from "./components/Hero/index"
import ServicesSection from "./components/Services/index"
import AboutSection from "./components/About/index"
import GlobalReach from "./components/GlobalReach/index"
import ClientFeedback from "./components/Testimonials/index"
import ContactCTA from "./components/ContactCTA/index"
import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: { absolute: `${brand.name} — Enterprise Cybersecurity & Software` },
  description: brand.description,
  alternates: { canonical: "/" },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: brand.siteUrl,
  description: brand.description,
  email: brand.contact.email,
  telephone: brand.contact.phone,
  address: { "@type": "PostalAddress", addressLocality: brand.contact.location },
  sameAs: brand.socials.map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section id="home"><OrganizationHero /></section>
      <section id="services"><ServicesSection/></section>
      <section id="about"> <AboutSection/> </section>
      <section id="global"> <GlobalReach/> </section>
      <section id="testimonials"> <ClientFeedback/> </section>
      <section id="contact"> <ContactCTA/> </section>
    </>
  );
}
