"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import {
  ShieldCheck,
  Code2,
  Server,
  Bug,
  Cloud,
  FileCheck,
  ArrowRight,
  ArrowUpRight,
  X,
  Search,
  PenTool,
  Hammer,
  Activity,
  type LucideIcon,
} from "lucide-react";
import PageIntro from "../components/PageIntro/index";
import { TimelineContent } from "@/components/ui/timeline-animations";
import { brand } from "@/config/brand";

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  detail: string;
  capabilities: string[];
  accent: string;
};

const services: Service[] = [
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    title: "Cybersecurity",
    blurb: "Offensive and defensive security for systems that cannot be wrong.",
    detail:
      "We treat security as an engineering discipline, not a checkbox. From architecture review to active defense, we help you understand how your systems break — and close the gaps before an attacker finds them.",
    capabilities: [
      "Security architecture review & hardening",
      "Vulnerability management & remediation",
      "Incident response & breach containment",
      "Continuous monitoring & threat detection",
    ],
    accent: "from-sky-500 to-blue-700",
  },
  {
    id: "pentesting",
    icon: Bug,
    title: "Penetration Testing",
    blurb: "Adversarial testing that finds what scanners miss.",
    detail:
      "Manual, scenario-driven engagements that emulate real attackers across your web apps, networks, and cloud. You get clear, prioritized findings with remediation guidance — and a retest to prove they're fixed.",
    capabilities: [
      "Web & API penetration testing",
      "Network & infrastructure testing",
      "OWASP Top 10 & business-logic flaws",
      "Prioritized findings + remediation retest",
    ],
    accent: "from-violet-500 to-indigo-700",
  },
  {
    id: "engineering",
    icon: Code2,
    title: "Software Engineering",
    blurb: "Resilient web platforms, built to scale under real load.",
    detail:
      "Custom web and SaaS products engineered secure-by-design. We ship maintainable systems your team can own — with the performance, testing, and documentation enterprises actually need.",
    capabilities: [
      "Custom web & SaaS development",
      "API design, integration & platform work",
      "Performance & reliability engineering",
      "Secure-by-design architecture",
    ],
    accent: "from-emerald-500 to-teal-700",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    blurb: "Deploy, scale, and automate with confidence.",
    detail:
      "We design cloud infrastructure and delivery pipelines that are fast, observable, and cost-aware — so releases are boring and uptime is a given.",
    capabilities: [
      "Cloud architecture & deployment",
      "CI/CD pipelines & automation",
      "Observability & cost optimization",
      "Backup, recovery & continuity",
    ],
    accent: "from-amber-500 to-orange-700",
  },
  {
    id: "managed-it",
    icon: Server,
    title: "Managed IT & Support",
    blurb: "Dependable operations so your teams stay focused.",
    detail:
      "Proactive management of the day-to-day: networks, endpoints, identity, and a responsive help desk that resolves issues before they become fires.",
    capabilities: [
      "Network design, setup & optimization",
      "Endpoint management & diagnostics",
      "Identity, access & account recovery",
      "Responsive technical help desk",
    ],
    accent: "from-rose-500 to-pink-700",
  },
  {
    id: "compliance",
    icon: FileCheck,
    title: "Compliance & Risk",
    blurb: "Audit-ready posture without the theatre.",
    detail:
      "We translate frameworks into practical controls and evidence, getting you audit-ready while genuinely reducing risk — not just satisfying a checklist.",
    capabilities: [
      "ISO 27001 / SOC 2 readiness",
      "GDPR & data-protection alignment",
      "Risk assessment & control design",
      "Policy, evidence & audit support",
    ],
    accent: "from-cyan-500 to-sky-700",
  },
];

const engagement = [
  { icon: Search, step: "01", title: "Assess", description: "We map your systems, risks, and goals first." },
  { icon: PenTool, step: "02", title: "Architect", description: "We design secure, scalable solutions — no black boxes." },
  { icon: Hammer, step: "03", title: "Build", description: "We implement with rigor, testing, and documentation." },
  { icon: Activity, step: "04", title: "Operate", description: "We monitor and harden continuously." },
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
  hidden: { filter: "blur(8px)", y: 28, opacity: 0 },
};

function HorizontalServices({ onSelect }: { onSelect: (s: Service) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("300vh");

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const distance = trackRef.current.scrollWidth - window.innerWidth;
      setMaxX(Math.max(0, distance));
      // Give the pinned section enough scroll room for the full pan + a little dwell.
      setSectionHeight(`${Math.max(0, distance) + window.innerHeight * 1.2}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300); // re-measure after fonts settle
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  return (
    <section ref={sectionRef} style={{ height: sectionHeight }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-8 px-[8vw]">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
            Capabilities
          </div>
          <h2 className="font-display mt-2 text-4xl text-white sm:text-5xl">
            Six disciplines, one partner.
          </h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 px-[8vw]">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.id}
                layoutId={`card-${service.id}`}
                onClick={() => onSelect(service)}
                className="liquid-glass group relative flex h-[58vh] w-[82vw] shrink-0 flex-col rounded-3xl p-8 text-left transition-transform duration-300 hover:-translate-y-2 sm:w-[58vw] md:w-[42vw] lg:w-[32vw] xl:w-[30rem]"
              >
                <motion.div
                  layoutId={`icon-${service.id}`}
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.accent}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </motion.div>
                <motion.h3
                  layoutId={`title-${service.id}`}
                  className="font-display text-3xl text-white sm:text-4xl"
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  layoutId={`blurb-${service.id}`}
                  className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
                >
                  {service.blurb}
                </motion.p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/40 transition-colors group-hover:text-white/80">
                  Learn more <ArrowUpRight size={14} />
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <p className="mt-8 px-[8vw] text-xs text-white/30">
          Keep scrolling to move across ·  click a card for details
        </p>
      </div>
    </section>
  );
}

export default function ServicesClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Service | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <main ref={ref} className="relative">
      {/* Full-view intro */}
      <PageIntro
        eyebrow="Enterprise Solutions"
        title={
          <>
            Capabilities that
            <br />
            <span className="text-white/50">compound into outcomes.</span>
          </>
        }
        subtitle={`${brand.name} delivers across security, engineering, and operations — each discipline reinforcing the others.`}
      />

      {/* Horizontal scroll cards */}
      <HorizontalServices onSelect={setActive} />

      {/* Linear-style modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="service-modal"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] grid place-items-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="absolute inset-0 backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,78,216,0.92) 0%, rgba(17,42,120,0.94) 30%, rgba(8,18,52,0.96) 60%, rgba(3,6,15,0.97) 100%)",
              }}
            />
            <motion.div
              layoutId={`card-${active.id}`}
              className="liquid-glass relative z-10 w-full max-w-lg overflow-hidden rounded-3xl p-8"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>

              <motion.div
                layoutId={`icon-${active.id}`}
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${active.accent}`}
              >
                <active.icon className="h-6 w-6 text-white" />
              </motion.div>
              <motion.h2 layoutId={`title-${active.id}`} className="font-display text-4xl text-white">
                {active.title}
              </motion.h2>
              <motion.p layoutId={`blurb-${active.id}`} className="mt-2 text-sm text-white/55">
                {active.blurb}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <p className="mt-6 text-sm leading-relaxed text-white/70">{active.detail}</p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {active.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                      {cap}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
                >
                  Discuss this service <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Engagement model */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-display text-4xl text-white sm:text-5xl">How we engage</h2>
            <p className="mt-4 text-white/60">A disciplined path from first conversation to long-term operation.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagement.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <TimelineContent
                  key={phase.title}
                  animationNum={index}
                  customVariants={revealVariants}
                  timelineRef={ref}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-sky-400/40 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-sky-400" />
                    <span className="font-display text-4xl text-white/15">{phase.step}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{phase.description}</p>
                </TimelineContent>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 to-blue-800 p-10 text-center shadow-2xl shadow-blue-900/30 md:p-16">
          <h2 className="font-display text-3xl text-white sm:text-4xl md:text-5xl">Let&apos;s scope your next engagement</h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Tell us what you&apos;re building or defending. We&apos;ll come back with a clear, honest plan — not a sales pitch.
          </p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:bg-blue-50">
            Start a conversation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
