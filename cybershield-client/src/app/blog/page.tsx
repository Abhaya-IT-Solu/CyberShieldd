import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on security, engineering, and building resilient systems.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true }, // no real content yet
};

export default function Blog() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
      <div className="relative z-10 max-w-2xl">
        <div className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
          Journal
        </div>
        <h1 className="font-display text-5xl tracking-tight text-white sm:text-7xl">
          Coming soon.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
          We&apos;re preparing field notes on security, engineering, and building
          systems that hold up under pressure. Check back shortly.
        </p>
        <Link
          href="/"
          className="liquid-glass mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white transition-transform hover:scale-[1.03]"
        >
          <ArrowLeft size={16} /> Back home
        </Link>
      </div>
    </main>
  );
}
