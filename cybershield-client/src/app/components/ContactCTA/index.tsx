import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brand } from "@/config/brand";

// Server component — no client JS needed; the reveal is pure CSS.
export default function ContactCTA() {
  return (
    <section className="relative px-6 py-28">
      <div className="relative z-10 mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 to-blue-800 p-10 text-center shadow-2xl shadow-blue-900/30 md:p-16">
        <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          Let&apos;s build something
          <br />
          <span className="text-blue-100/70">secure together.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100 md:text-lg">
          Reach out to {brand.name} for honest technical help, clear
          communication, and solutions that work in the real world.
        </p>
        <Link
          href="/contact"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-blue-700 shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Get in touch <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
