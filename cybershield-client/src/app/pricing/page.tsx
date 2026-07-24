import { redirect } from "next/navigation";

// Pricing is disconnected from the site for now while the brand is revamped.
// PricingClient.tsx is kept in place so this can be re-enabled later.
export default function Pricing() {
  redirect("/");
}
