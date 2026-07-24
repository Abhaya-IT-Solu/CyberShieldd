import Link from "next/link";
import { brand } from "@/config/brand";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export default function OrganizationHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Fullscreen looping background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Legibility scrim — kept minimal so the video carries the depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-background/10 to-background/70" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 pt-32 pb-40">
        <span className="animate-fade-rise liquid-glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90 mb-8">
          Enterprise-grade cybersecurity &amp; software engineering
        </span>

        <h1
          className="font-display animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-6xl font-normal text-white"
        >
          Security and software that{" "}
          <em className="not-italic text-white/55">
            move enterprises forward.
          </em>
        </h1>

        <p className="animate-fade-rise-delay text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
          {brand.name} partners with ambitious organizations to secure critical
          systems and ship resilient software — engineered for scale, hardened
          for threat, and built for trust.
        </p>

        <div className="animate-fade-rise-delay-2 mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact"
            className="liquid-glass rounded-full px-14 py-5 text-base text-white hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Begin a conversation
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full px-14 py-5 text-base text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
