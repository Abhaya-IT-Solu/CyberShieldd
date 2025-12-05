"use client";
import { TimelineContent } from "../ui/timeline-animations";
import VerticalCutReveal from "../ui/vertical-cut-reveal";
import { Card, CardContent, CardHeader } from "../ui/card";
import Founder from "../../assests/Team-photos/Founder.png"
import Badak from "../../assests/Team-photos/badak.png"
import { PhotoCard } from "./SVGClipPath";
import ButtonHover1 from "../ui/button-hover1";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import clsx from "clsx";

export default function AboutSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };
  const revealVariants2 = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -40,
      opacity: 0,
    },
  };
  const revealVariants3 = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      opacity: 0,
    },
  };

  const founder = [
    "Certified Cybersecurity specialist (ISC2 CC)",
    "Passionate bug bounty hunter",
    "Skilled in Java, Linux, and networking"
  ]

  const member = [
    "Expert in building secure, maintainable web applications.",
    "Part time Joker",
    "Lent some of his IQ to Einstien"
  ]
  return (
    <section
      className="relative py-32 px-4 bg-gray-50 overflow-hidden"
      ref={heroRef}
    >

      {/* Amber Glow Background */}
      <TimelineContent
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff00 40%, #13131300 100%)
      `,
          backgroundSize: "100% 100%",
        }}
        animationNum={2}
        customVariants={revealVariants3}
        timelineRef={heroRef}
      />
      <TimelineContent
        className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#a3a3a32e_1px,transparent_1px),linear-gradient(to_bottom,#a3a3a32e_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)]"
        animationNum={3}
        customVariants={revealVariants3}
        timelineRef={heroRef}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-blue-600  text-lg font-semibold uppercase mb-6 flex items-center justify-center gap-2">
          About
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.2}
            staggerFrom="last"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 30,
              delay: 0.2,
            }}
            containerClassName="text-[#00000] leading-[120%] text-center  justify-center items-center"
          >
            {
              "A Legacy of Excellence, How Our Dedication Fuels Everything We Do"
            }
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={heroRef}
          className="text-gray-600 text-center sm:text-lg text-sm mb-8 leading-relaxed"
        >
          CyberShield Solutions is on a mission to make cybersecurity accessible for everyone. 
          We empower students and small businesses to defend against digital threats with affordable, 
          expert support.
        </TimelineContent>

        <TimelineContent
          as="button"
          animationNum={1}
          customVariants={revealVariants3}
          timelineRef={heroRef}
          className="bg-blue-600 hover:bg-blue-600 shadow-lg shadow-blue-600 border border-blue-600 flex w-fit mx-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-full cursor-pointer"
        >
          <a href="/services">Explore Our Services</a> <ArrowRight className="" />
        </TimelineContent>
      </div>

      <div className="flex max-w-6xl m-10 mx-auto grid grid-cols-2 gap-4 pt-8 lg:h-[26rem] md:h-[22rem] sm:h-[16rem] h-[14rem]">
        <div className="flex m-4">
          <PhotoCard 
            Title="Founder"
            imageurl={Founder.src}
          > 
            <div className="flex align-start">
             <ul className="space-y-3 mb-6 m-4">
                {founder.map((skill, index) => (
                  <li key={index} className="text-sm text-gray-900">
                    {skill}
                  </li>
                ))}
              </ul>
          </div>

          </PhotoCard>

        </div>

        <div className="flex m-4">
            <PhotoCard 
              Title="Co-Founder"
              imageurl={Badak.src}
            > 
            <div>
              <ul className="space-y-3 mb-6 m-4">
                  {member.map((skill, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {skill}
                    </li>
                  ))}
                </ul>
            </div>
            </PhotoCard>
            
        </div>
      </div>
    </section>
  );
}
