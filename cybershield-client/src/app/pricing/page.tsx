import PricingClient from "./PricingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Abhaya IT Solutions",
  description:
    "Get a quote for our web development services based on your project requirements.",
};

export default function Pricing() {
    return <PricingClient />;
}
