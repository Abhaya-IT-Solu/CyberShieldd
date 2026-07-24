"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, Zap, Shield } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animations";
import { brand } from "@/config/brand";

const values = [
  {
    icon: Users,
    title: "Work directly with clients",
    description: "No sales layers — senior collaboration from day one.",
  },
  {
    icon: Zap,
    title: "Move fast, fix real problems",
    description: "Agile delivery without the bureaucracy.",
  },
  {
    icon: Shield,
    title: "Security over shortcuts",
    description: "Built the right way, because the wrong way costs more.",
  },
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
  hidden: { filter: "blur(8px)", y: 28, opacity: 0 },
};

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative px-6 py-28" ref={ref}>
      <div className="relative z-10 mx-auto mb-14 max-w-3xl text-center">
        <TimelineContent
          as="div"
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={ref}
          className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          About Us
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          customVariants={revealVariants}
          timelineRef={ref}
          className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Intentionally lean,
          <br />
          <span className="text-white/50">deliberately senior.</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          customVariants={revealVariants}
          timelineRef={ref}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {brand.name} works at the intersection of IT support, software
          engineering, and cybersecurity — without bloated contracts or
          unnecessary complexity.
        </TimelineContent>
      </div>

      <div className="relative z-10 mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <TimelineContent
              key={value.title}
              animationNum={index + 3}
              customVariants={revealVariants}
              timelineRef={ref}
              className="liquid-glass rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2"
            >
              <Icon className="mb-4 h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {value.description}
              </p>
            </TimelineContent>
          );
        })}
      </div>

      <div className="relative z-10 text-center">
        <Link
          href="/about"
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm text-white transition-transform hover:scale-[1.03]"
        >
          More about us <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
