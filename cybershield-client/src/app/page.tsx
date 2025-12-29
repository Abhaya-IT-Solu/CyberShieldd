import Header from "./components/Navbar/index"
import OrganizationHero from "./components/Hero/index"
import ServicesSection from "./components/Services/index"
import AboutSection from "./components/About/index"
import ClientFeedback from "./components/Testimonials/index"
import ContactForm from "./components/Contact/index"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abhaya IT Solutions",
  description:
    "Abhaya IT Solutions provides cybersecurity and IT services including network security, cloud protection, and threat monitoring for businesses.",
};


export default function Home() {
  return (
    <>
      <section id="home"><OrganizationHero /></section>
      <section id="services"><ServicesSection/></section>
      <section id="about"> <AboutSection/> </section>
      <section id="testimonials"> <ClientFeedback/> </section>
      <section id="contact"> <ContactForm/> </section>
    </>
  );
}
