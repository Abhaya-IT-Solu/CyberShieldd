"use client";
import { TimelineContent } from "../ui/timeline-animations";
import Image from "next/image";
import { useRef } from "react";

function ClientFeedback() {
    const testimonialRef = useRef<HTMLDivElement>(null);
  
    const revealVariants = {
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: i * 0.4,
          duration: 0.5,
        },
      }),
      hidden: {
        filter: "blur(10px)",
        y: -20,
        opacity: 0,
      },
    };
  
  return (
    <>
      <section className="relative  h-full container mx-auto m-4  rounded-lg  py-14 bg-white" ref={testimonialRef}>
        <article className={"max-w-screen-md mx-auto text-center space-y-2 "} >
          <TimelineContent as="h1" className={"xl:text-4xl text-3xl m-4  font-medium"} animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            Trusted by Startups and the worlds's largest companies
          </TimelineContent>
          <TimelineContent as="p" className={"mx-auto text-gray-500"} animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            Let's hear how CyberShields client's feels about our service
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3  gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2 ">
            <TimelineContent animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-200 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <figure>
                <Image
                  src={"/logos/mock_bg2.png"}
                  alt="logo"
                  width={600}
                  height={200}
                />
              </figure>
              <article className="mt-auto">
                <p>
                  "Your team has been extremely reliable and responsive. The Help Desk support provided for AAI Online Service has improved our workflow and reduced issue-resolution time significantly. We appreciate the professionalism and timely assistance"
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-sm">
                      Owner
                    </h2>
                    <p className="">AAI Online Service</p>
                  </div>
                  <Image
                    src="/people/default.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] lg:h-fit  lg:shrink-0 flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p>
                  "The technical support team showed great expertise and quick problem-solving. Their ability to resolve critical issues within minutes has helped our operations run smoothly. Excellent service!"
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Atish</h2>
                    {/* <p className="">CEO of Kintsugi</p> */}
                  </div>
                  <Image
                    src="/people/default.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full  md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  "My laptop kept crashing while  projects. The remote troubleshooting fixed it in under one hours. Saved my entire time and work."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">
                      Avishkar Chavhan{" "}
                    </h2>
                    <p className="lg:text-base text-sm">Freelance Graphic Designer</p>
                  </div>
                  <Image
                    src="/people/p1_M.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  "I had a malware issue slowing down everything. The cleanup guidance solved it quickly."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">Aparna Iyer</h2>
                    <p className="lg:text-base text-sm">BCA Student</p>
                  </div>
                  <Image
                    src="/people/p3_F.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#111111] text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  "Their customer support is absolutely exceptional. They are
                  always available, incredibly helpful."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg">
                      Shalini Nambiar
                    </h2>
                    <p className="lg:text-base text-sm">E-commerce Store Owner</p>
                  </div>
                  <Image
                    src="/people/default.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-lg border border-gray-200 p-5">
              <article className="mt-auto">
                <p>
                  "The pen-testing demo revealed vulnerabilities we didn’t know existed. The consultation after was extremely useful"
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl">Harshvardhan Singh</h2>
                    <p className="">Startup Founder</p>
                  </div>
                  <Image
                    src="/people/p2_M.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-200 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <figure>
                <Image
                  src={"/logos/mock_bg1.png"}
                  alt="logo"
                  width={450}
                  height={450}
                />
              </figure>
              <article className="mt-auto">
                <p>
                  "They built our entire website from scratch with a clean UI and a fast backend. The dashboard works exactly the way we wanted, and the loading speed improved drastically."
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl"></h2>
                    <p className="">Founder</p>
                  </div>
                  <Image
                    src="/people/default.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>

        <div className="absolute border-b-2 border-[#e6e6e6] bottom-0 h-16 z-[2] md:w-full w-[90%] md:left-0 left-[5%]">
          <div className="container mx-auto w-full h-full relative before:absolute before:-left-2 before:-bottom-2 before:w-4 before:h-4 before:bg-white before:shadow-sm before:border border-gray-200 before:border-gray-300 after:absolute after:-right-2 after:-bottom-2 after:w-4 after:h-4 after:bg-white after:shadow-sm after:border after:border-gray-300 "></div>
        </div>
      </section>
    </>
  );
}

export default ClientFeedback;
