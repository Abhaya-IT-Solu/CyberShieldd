'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
// import { ReactNode } from "react";

import Image from 'next/image';
const projects = [
  {
    title: 'Web Services and Support',
    description:
      'We provide end-to-end web development services, including corporate websites, e-commerce platforms, landing pages, portfolios, custom web applications, PWAs, SaaS products, and enterprise-grade solutions. Beyond development, we ensure long-term success through ongoing maintenance, security monitoring, performance optimization, and dedicated technical support. Our focus is on building scalable, secure, and high-performing digital products that support real business growth across all devices.',
    src: 'rock.jpg',
    link: 'https://images.unsplash.com/photo-1613068687893-5e85b4638b56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
    color: '#5196fd',
  },
  {
    title: 'Basic IT Help Desk',
    description:
      'Software troubleshooting, virus scans, malware removal, application crashes, installation errors, operating system issues, email client support, data recovery guidance, password resets, and basic fixes delivered remotely within 2-4 hours.',
    src: 'rock.jpg',
    link: 'https://plus.unsplash.com/premium_vector-1682303140641-796513c12f7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXQlMjBzdXBwb3J0fGVufDB8fDB8fHww',
    color: '#5196fd',
  },
  {
    title: 'Computer Hardware Diagnostics',
    description:
      'RAM testing, overheating solutions with thermal monitoring, hard drive health checks, battery troubleshooting, BIOS optimization, peripheral fixes, CPU stress testing, GPU benchmarking, and upgrade recommendations for peak performance.',
    src: 'tree.jpg',
    link: 'https://plus.unsplash.com/premium_vector-1682304648569-4bc879205512?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXQlMjBzdXBwb3J0fGVufDB8fDB8fHww',
    color: '#8f89ff',
  },
  {
    title: 'Software Installation',
    description:
      'Linux distribution installs with dual-boot, Windows setups, Java and Python configuration, IDE setup for VS Code and IntelliJ, Git and GitHub integration, database installations, antivirus deployment, and VPN configuration.',
    src: 'water.jpg',
    link: 'https://plus.unsplash.com/premium_vector-1734027997317-854a5f2c7b72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U29mdHdhcmUlMjBJbnN0YWxsYXRpb258ZW58MHx8MHx8fDA%3D',
    color: '#13006c',
  },
  {
    title: 'Basic Networking Assistance',
    description:
      'Wi-Fi router setup and optimization, IP configuration, subnet planning, connection troubleshooting, router security with WPA3 encryption, mesh network planning, file sharing across devices, guest network isolation, and port forwarding.',
    src: 'house.jpg',
    link: 'https://plus.unsplash.com/premium_vector-1745324167720-ffec87f0e7f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmFzaWMlMjBOZXR3b3JraW5nJTIwQXNzaXN0YW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    color: '#ed649e',
  },
  {
    title: 'Introductory Pen Testing Demo',
    description:
      'Free automated vulnerability scan focusing on OWASP Top 10 threats including SQL injection and XSS, color-coded risk findings, actionable remediation suggestions, security score rating, and 30-minute follow-up consultation.',
    src: 'cactus.jpg',
    link: 'https://plus.unsplash.com/premium_vector-1682298597294-6237d53fecc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW5qZWN0aW9uJTIwVGVzdGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    color: '#52a5bcff',
  },
  {
    title: 'Simple Website Security Check',
    description:
      'SSL/TLS validation, HTTPS enforcement, security header assessment, CMS security review for WordPress and Joomla, outdated plugin detection, client-side vulnerability scanning, malware injection detection, and web dev support.',
    src: 'cactus.jpg',
    link: 'https://plus.unsplash.com/premium_vector-1725881519668-4b26c5072659?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFdlYnNpdGUlMjBTZWN1cml0eSUyMENoZWNrfGVufDB8fDB8fHww',
    color: '#fd521a',
  },
  /*
  {
    title: ' Introductory Pen Testing Demo',
    description:
      'Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.',
    src: 'cactus.jpg',
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop',
    color: '#fd521a',
  },
  {
    title: ' Introductory Pen Testing Demo',
    description:
      'Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.',
    src: 'cactus.jpg',
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop',
    color: '#fd521a',
  }, */
];
export default function About(){
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  return (
    <ReactLenis root>
      <main className='bg-black' ref={container}>
        <>
          <section className='text-white  h-[70vh]  w-full bg-slate-950  grid place-content-center '>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              Comprehensive IT & Security Services.
            </h1>
            <h2 className='2xl:text-3xl text-2xl px-8 text-center tracking-tight leading-[120%]'>
              Start Free, Scale as You Grow
            </h2>
          </section>
        </>

        <section className='text-white w-full bg-slate-950  '>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-md lg:p-10 sm:p-4 p-2 origin-top overflow-hidden`}
      >
        <h2 className='text-2xl text-center font-semibold'>{title}</h2>
        <div className={`flex h-full mt-5 gap-10`}>
          <div className={`w-[40%] relative top-[10%] overflow-hidden`}>
            <p className='text-sm overflow-hidden'>{description}</p>
            <span className='flex items-center gap-2 pt-2'>
              <a
                href={'/services/webservices'}
                target='_blank'
                className='underline cursor-pointer'
              >
                See more
              </a>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>

          <div
            className={`relative w-[60%] h-full rounded-lg overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image fill src={url} alt='image' className='object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};