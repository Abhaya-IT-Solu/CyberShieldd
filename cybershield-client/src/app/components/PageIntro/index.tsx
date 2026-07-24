import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";

interface PageIntroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Optional background image (rendered blurred) or looping video. */
  imageSrc?: string;
  videoSrc?: string;
  scrollHint?: boolean;
}

/**
 * Full-viewport cinematic page intro. Defaults to a gradient/aurora + grid
 * background; pass imageSrc for a blurred photo or videoSrc for a looping clip.
 */
export default function PageIntro({
  eyebrow,
  title,
  subtitle,
  actions,
  imageSrc,
  videoSrc,
  scrollHint = true,
}: PageIntroProps) {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background */}
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        />
      ) : (
        <>
          <div className="animate-aurora absolute -top-24 left-1/4 h-[36rem] w-[36rem] rounded-full bg-sky-600/20 blur-[150px]" />
          <div
            className="animate-aurora absolute top-1/3 right-1/5 h-[30rem] w-[30rem] rounded-full bg-blue-700/25 blur-[150px]"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="animate-aurora absolute bottom-4 left-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-700/20 blur-[150px]"
            style={{ animationDelay: "-9s" }}
          />
        </>
      )}

      {/* Dotted grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff1f_1px,transparent_1.5px)] bg-[size:26px_26px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_45%,transparent_100%)]" />

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {eyebrow && (
          <div className="animate-fade-rise mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display animate-fade-rise text-5xl leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-fade-rise-delay mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {subtitle}
          </p>
        )}
        {actions && (
          <div className="animate-fade-rise-delay-2 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {actions}
          </div>
        )}
      </div>

      {scrollHint && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      )}
    </section>
  );
}
