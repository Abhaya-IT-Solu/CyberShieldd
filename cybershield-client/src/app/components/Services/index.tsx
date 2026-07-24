"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Wrench, Code2, ShieldCheck } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animations";

const services = [
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Risk assessments, penetration testing, and continuous threat monitoring.",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Custom platforms and web apps, engineered secure-by-design and built to scale.",
  },
  {
    icon: Wrench,
    title: "Managed IT",
    description:
      "Networks, endpoints, and a responsive help desk that keeps operations steady.",
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

export default function ServicesSection() {
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
          What We Do
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          customVariants={revealVariants}
          timelineRef={ref}
          className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Three disciplines,
          <br />
          <span className="text-white/50">one accountable partner.</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          customVariants={revealVariants}
          timelineRef={ref}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          Security, engineering, and operations delivered as one system — so
          nothing falls through the gaps between them.
        </TimelineContent>
      </div>

      <div className="relative z-10 mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <TimelineContent
              key={service.title}
              animationNum={index + 3}
              customVariants={revealVariants}
              timelineRef={ref}
              className="liquid-glass group rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-2xl text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {service.description}
              </p>
            </TimelineContent>
          );
        })}
      </div>

      <div className="relative z-10 text-center">
        <Link
          href="/services"
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm text-white transition-transform hover:scale-[1.03]"
        >
          Explore all capabilities <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
