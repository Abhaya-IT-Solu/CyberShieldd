"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ArrowDown, X, ArrowRight } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animations";
import PageIntro from "../components/PageIntro/index";
import { brand } from "@/config/brand";

type Project = {
  index: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  accent: string;
  glow: string;
  /**
   * Screenshots for this project. Drop files in /public/projects and list
   * them here as "/projects/<file>". Up to 4 are shown as the floating
   * background cards; the first is also used as the modal cover.
   * Leave empty to fall back to the abstract gradient mockups.
   */
  images: string[];
  challenge: string;
  approach: string;
  outcome: string;
};

const projects: Project[] = [
  {
    index: "01",
    category: "Web Platform",

    title: "ShasanSeva – Scheme Assistance Platform",

    summary:
      "Designed and built a full-stack platform that streamlines government and private scheme application assistance. The system manages the complete lifecycle—from scheme discovery and secure document collection to payment processing, admin verification, proof uploads, and real-time order tracking—through a scalable, service-oriented architecture.",

    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Redis",
      "AWS S3",
      "Cloud"
    ],

    accent: "from-sky-500 to-blue-700",

    glow: "rgba(56,189,248,0.22)",

    images: [
      "/projects/shsnsva1.png",
      "/projects/shsnsva2.png",
      "/projects/shsnsva3.png",
      "/projects/shsnsva4.png"
    ],

    challenge:
      "The client needed a centralized platform to manage scheme assistance without relying on scattered WhatsApp conversations, spreadsheets, and manual document handling. The system had to securely collect sensitive documents, enforce a structured application workflow, support online payments, provide transparency through order tracking, and maintain strict access control while remaining scalable for future scheme categories and increased user traffic.",

    approach:
      "Architected the platform using Next.js and TypeScript with a service-oriented backend to keep authentication, order management, document processing, payments, and notifications modular. Implemented passwordless authentication using OTP and Google OAuth, Redis for session management, rate limiting, and caching, secure private object storage for user documents with signed URLs, role-based dashboards for users and administrators, immutable order state transitions, audit logging for operational actions, and optimized client-side caching to reduce redundant API requests while maintaining data consistency.",

    outcome:
      "Delivered a production-ready platform capable of managing the complete assistance workflow through a single source of truth. The solution eliminated manual tracking, standardized document verification, improved operational transparency with real-time order timelines, enforced secure access to sensitive documents, reduced administrative overhead through structured workflows, and provided a scalable foundation for onboarding new schemes, user categories, and future platform features without major architectural changes."
  },
  {
    index: "02",

    category: "AI Platform",

    title: "ReplyAI – LLM Evaluation Platform",

    summary:
      "Built an AI-powered customer support assistant that generates context-aware email replies using Retrieval-Augmented Generation (RAG) and automatically evaluates every response before it reaches an agent. The platform combines retrieval, generation, multi-dimensional quality scoring, and runtime safety gates to ensure only high-confidence responses are suggested.",

    tags: [
      "Python",
      "FastAPI",
      "React",
      "Amazon Bedrock",
      "LLMs",
      "RAG",
      "Vector Search",
      "AI Evaluation"
    ],

    accent: "from-violet-500 to-fuchsia-700",

    glow: "rgba(163, 73, 247, 0.22)",

    images: [
      "/projects/replyai1.png",
      "/projects/replyai2.png",
      "/projects/replyai3.png",
      "/projects/replyai4.png"
    ],

    challenge:
      "Traditional AI email assistants often produce fluent but factually incorrect responses, making them unreliable for customer support. The challenge was to build a production-ready system that not only generated accurate replies using company knowledge but could also objectively evaluate their correctness, detect hallucinations, and prevent low-quality responses from reaching human agents.",

    approach:
      "Designed a Retrieval-Augmented Generation pipeline using Amazon Bedrock foundation models, vector embeddings, and a structured company knowledge base to generate grounded email responses. Developed a multi-dimensional evaluation framework measuring action correctness, factual grounding, ask coverage, safety, completeness, and tone. Added deterministic validation rules, runtime quality gates, perturbation testing, automated benchmarking, and human-correlation tooling to continuously validate model performance while supporting seamless feedback-driven improvements.",

    outcome:
      "Delivered a production-ready AI support platform with automated quality assurance for every generated response. The evaluation system successfully detected hallucinations, policy violations, missing customer requests, and unsafe outputs before suggestion, enabling trustworthy AI-assisted customer support while providing a scalable framework for continuous evaluation, regression testing, and future model upgrades."
  },
  {
  index: "03",

  category: "AI Automation",

  title: "AI SDR Agent – Automated Sales Outreach",

  summary:
    "Developed an end-to-end AI-powered Sales Development Representative (SDR) pipeline that automates B2B prospecting from a single company domain. The system discovers similar companies, identifies decision-makers, enriches and verifies contact information, and delivers personalized cold outreach emails through a fully automated, multi-stage workflow.",

  tags: [
    "Python",
    "REST APIs",
    "Automation",
    "Sales Tech",
    "Email Automation",
    "CLI",
    "Integrations"
  ],

  accent: "from-emerald-500 to-teal-700",

  glow: "rgba(16,185,129,0.22)",

  images: [
    "/projects/outreach1.png",
    "/projects/outreach2.png",
    "/projects/outreach3.png",
    "/projects/outreach4.png"
  ],

  challenge:
    "Sales prospecting typically requires switching between multiple tools to discover target companies, identify decision-makers, verify business email addresses, and launch outreach campaigns. This fragmented workflow is time-consuming, error-prone, and difficult to scale while maintaining consistent outreach quality.",

  approach:
    "Engineered a modular, four-stage automation pipeline in Python that orchestrates multiple third-party APIs. The system discovers lookalike companies using Ocean.io, identifies key decision-makers through Prospeo, optionally verifies email addresses with Eazyreach, and sends personalized outreach emails via Brevo. Built configurable CLI workflows, dry-run execution for safe testing, environment-based configuration management, confirmation checkpoints before live campaigns, graceful handling of optional services, and resilient error handling for API failures and rate limits.",

  outcome:
    "Delivered a fully automated outbound sales pipeline capable of transforming a single company domain into a verified list of qualified prospects and personalized outreach emails with minimal manual intervention. The modular architecture allows individual services to be replaced or extended easily, providing a scalable foundation for AI-driven lead generation and automated sales outreach."
  },
];

/** A decorative browser-window mockup used as a floating parallax card. */
function MockWindow({
  accent,
  className,
  depth,
  src,
  alt,
}: {
  accent: string;
  className?: string;
  depth: number;
  /** Optional real screenshot; falls back to the abstract mockup. */
  src?: string;
  alt?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute w-64 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-sm transition-transform duration-300 ease-out sm:w-80 ${className ?? ""}`}
      style={{
        transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
      }}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
      </div>
      {src ? (
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes="(max-width: 640px) 16rem, 20rem"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="space-y-2 p-4">
          <div className={`h-16 rounded-md bg-gradient-to-br ${accent} opacity-70`} />
          <div className="h-2 w-3/4 rounded-full bg-white/15" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
          <div className="h-2 w-2/3 rounded-full bg-white/10" />
        </div>
      )}
    </div>
  );
}

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7 },
  }),
  hidden: { filter: "blur(10px)", y: 30, opacity: 0 },
};

function ProjectSection({
  project,
  last,
  onSelect,
}: {
  project: Project;
  last: boolean;
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: project.glow }}
      />

      {/* Floating parallax mockups */}
      <MockWindow accent={project.accent} depth={26} src={project.images[0]} alt={project.title} className="left-[4%] top-[14%] -rotate-6 sm:left-[8%]" />
      <MockWindow accent={project.accent} depth={44} src={project.images[1]} alt={project.title} className="right-[3%] top-[18%] rotate-6 sm:right-[9%]" />
      <MockWindow accent={project.accent} depth={34} src={project.images[2]} alt={project.title} className="bottom-[10%] left-[8%] rotate-3 hidden sm:block" />
      <MockWindow accent={project.accent} depth={54} src={project.images[3]} alt={project.title} className="bottom-[8%] right-[6%] -rotate-3 hidden sm:block" />

      {/* Center glass panel */}
      <TimelineContent
        as="div"
        animationNum={0}
        customVariants={revealVariants}
        timelineRef={ref}
        className="liquid-glass relative z-10 w-full max-w-xl rounded-[2rem] p-10 text-center md:p-14"
      >
        <div className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          <span>{project.index}</span>
          <span className="h-px w-8 bg-white/20" />
          <span>{project.category}</span>
        </div>
        <h2 className="font-display text-4xl leading-tight text-white sm:text-6xl">
          {project.title}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          {project.summary}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => onSelect(project)}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
        >
          View Project <ArrowUpRight size={16} />
        </button>
      </TimelineContent>

      {last && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/30">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      )}
    </section>
  );
}

export default function PortfolioClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  // Cursor parallax — write pointer position into CSS vars via rAF.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let frame = 0;
    const handleMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth - 0.5) * 2;
        const py = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
        frame = 0;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Esc to close + lock scroll while the case study is open.
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
    <div ref={rootRef} className="relative">
      <PageIntro
        eyebrow="Selected Work"
        title="Proof over promises."
        subtitle={`Case studies are being refreshed for the new ${brand.name} brand. Scroll to preview the format — each engagement told full-screen, one after another.`}
      />

      {projects.map((project, i) => (
        <ProjectSection
          key={project.index}
          project={project}
          last={i === projects.length - 1}
          onSelect={setActive}
        />
      ))}

      {/* Case-study modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="case-modal"
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
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25 }}
              className="liquid-glass relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl p-8 scrollbar-none"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>

              {active.images[0] && (
                <div className="relative mb-6 h-44 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={active.images[0]}
                    alt={active.title}
                    fill
                    sizes="32rem"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                <span>{active.index}</span>
                <span className="h-px w-8 bg-white/20" />
                <span>{active.category}</span>
              </div>
              <h2 className="font-display text-4xl text-white">{active.title}</h2>

              <div className={`mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r ${active.accent}`} />

              <div className="mt-6 space-y-6">
                {[
                  ["Challenge", active.challenge],
                  ["Approach", active.approach],
                  ["Outcome", active.outcome],
                ].map(([heading, body]) => (
                  <div key={heading}>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
                      {heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
              >
                Discuss a similar project <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closing CTA */}
      <section className="relative px-6 pb-32 pt-10 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            Your project could be next.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-700 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/40 transition-transform hover:scale-[1.03]"
          >
            Start a conversation <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
