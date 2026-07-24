import Earth from "@/components/ui/globe";
import { Sparkles } from "@/components/ui/sparkles";
import { brand } from "@/config/brand";

export default function GlobalReach() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-0">
      <article className="relative z-10 mx-auto grid max-w-3xl gap-5 text-center">
        <span className="mx-auto w-fit rounded-full border border-[#3273ff]/60 bg-[#0f1c35] px-3 py-1 text-xs text-white/80">
          Global Reach
        </span>
        <h2 className="font-display bg-gradient-to-b from-[#edeffd] to-[#7b9cda] bg-clip-text text-4xl leading-[1.05] tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Local partnership,
          <br />
          worldwide delivery.
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          {brand.name} secures and builds for organizations across time zones —
          remote-first, always-on, and engineered to operate wherever your
          business does.
        </p>
        <Earth className="mt-4" />
      </article>

      {/* Horizon glow + sparkle field */}
      <div className="relative -mt-28 h-80 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#163474] after:bg-[#08132b]">
        <Sparkles
          density={1000}
          color="#7cc4ff"
          className="absolute inset-x-0 bottom-0 h-full w-full"
        />
      </div>
    </section>
  );
}
