"use client";
import { useRef } from "react";
import Link from "next/link";
import { TimelineContent } from "@/components/ui/timeline-animations";
import PageIntro from "../components/PageIntro/index";
import Founder from "../assests/Team-photos/Founder.png";
import { PhotoCard } from "../components/About/SVGClipPath";
import { ArrowRight, Target, Users, Shield, Zap } from "lucide-react";
import { brand } from "@/config/brand";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.7 },
  }),
  hidden: { filter: "blur(10px)", y: 32, opacity: 0 },
};

const founderSkills = [
  "Certified Cybersecurity specialist (ISC2 CC)",
  "Passionate bug bounty hunter",
  "Skilled in Java, Linux, and networking",
];

const values = [
  { icon: Users, title: "Work directly with clients", description: "No sales layers — genuine, senior collaboration from day one." },
  { icon: Zap, title: "Move fast, fix real problems", description: "Agile delivery without the bureaucracy that slows everyone down." },
  { icon: Shield, title: "Security over shortcuts", description: "We build things the right way, because the wrong way costs more." },
];

const approach = [
  { step: "01", title: "Understand the problem clearly", description: "We take time to comprehend your unique challenges." },
  { step: "02", title: "Solve it using proven technology", description: "Practical, battle-tested solutions that hold up." },
  { step: "03", title: "Secure it for the long term", description: "Built secure from day one — prevention beats cure." },
];

export default function AboutClient() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <main ref={ref} className="relative min-h-screen">
      {/* Full-view intro */}
      <PageIntro
        eyebrow="About Us"
        title={
          <>
            Good security shouldn&apos;t be
            <br />
            <span className="text-white/50">complicated or out of reach.</span>
          </>
        }
        subtitle={`${brand.name} was founded on a simple belief: enterprise-grade IT and cybersecurity should be clear, honest, and genuinely effective — without the bloat, jargon, or inflated contracts.`}
        actions={
          <Link href="/services" className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white transition-transform hover:scale-[1.03]">
            Explore our services <ArrowRight size={16} />
          </Link>
        }
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24">
        {/* Who we are */}
        <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={ref} className="mb-16">
          <div className="liquid-glass rounded-3xl p-8 md:p-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-display text-3xl text-white md:text-4xl">Who we are</h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-white/70 md:text-lg">
              <p>
                We are a <span className="text-white">small, focused technology team</span>,
                working with startups and growing businesses that need reliable IT,
                secure systems, and practical web solutions — not unnecessary complexity.
              </p>
              <p>
                Our work sits at the <span className="text-white">intersection of IT support,
                software engineering, and cybersecurity</span>. We don&apos;t just build and
                run systems — we think about how they break, how they&apos;re attacked, and how
                they should be defended from day one.
              </p>
              <p className="italic text-white/45">We&apos;re intentionally lean, and that&apos;s the point.</p>
            </div>
          </div>
        </TimelineContent>

        {/* Values */}
        <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={ref} className="mb-16">
          <h2 className="mb-10 text-center font-display text-4xl text-white md:text-5xl">What we value</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/40 hover:bg-white/[0.06]">
                  <Icon className="mb-4 h-6 w-6 text-sky-400" />
                  <h3 className="mb-2 text-lg font-semibold text-white">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{value.description}</p>
                </div>
              );
            })}
          </div>
        </TimelineContent>

        {/* Approach */}
        <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={ref} className="mb-16">
          <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-white/5 p-8 md:p-12">
            <h2 className="mb-10 text-center font-display text-4xl text-white md:text-5xl">Our approach</h2>
            <div className="space-y-4">
              {approach.map((item) => (
                <div key={item.step} className="flex items-start gap-6 rounded-2xl p-6 transition-colors duration-300 hover:bg-white/5">
                  <span className="font-display text-4xl text-white/20">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TimelineContent>

        {/* Founder + philosophy */}
        <TimelineContent animationNum={7} customVariants={revealVariants} timelineRef={ref} className="mb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-full">
              <PhotoCard Title="Founder" href="/contact" imageurl={Founder.src} Name="Mayur Sapkale">
                <ul className="m-4 mb-6 list-disc space-y-3 overflow-hidden">
                  {founderSkills.map((skill) => (
                    <li key={skill} className="text-sm text-white/70">{skill}</li>
                  ))}
                </ul>
              </PhotoCard>
            </div>
            <div className="liquid-glass flex flex-col justify-center rounded-3xl p-8">
              <h2 className="mb-6 font-display text-3xl text-white md:text-4xl">Our philosophy</h2>
              <div className="space-y-4">
                {[
                  ["Clarity over jargon", "we explain things in plain language."],
                  ["Security over shortcuts", "we build things the right way."],
                  ["Reliability over flashy demos", "solutions that last."],
                ].map(([bold, rest]) => (
                  <div key={bold} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                    <p className="leading-relaxed text-white/70">
                      <span className="text-white">{bold}</span> — {rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TimelineContent>

        {/* Closing */}
        <TimelineContent animationNum={8} customVariants={revealVariants} timelineRef={ref} className="mb-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 to-blue-800 p-10 text-center shadow-2xl shadow-blue-900/30 md:p-16">
            <h2 className="font-display text-3xl text-white sm:text-4xl md:text-5xl">We exist for exactly this</h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Honest technical help, clear communication, and solutions that work in the
              real world. If that&apos;s what you&apos;re looking for, {brand.name} is built for it.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-blue-700 transition-transform hover:scale-105">
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>
        </TimelineContent>
      </div>
    </main>
  );
}
