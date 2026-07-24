"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, ShieldCheck, Info, Briefcase, Users, Mail } from "lucide-react";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";
import { brand, navLinks } from "@/config/brand";

const iconByTitle: Record<string, React.ReactNode> = {
  Home: <Home className="h-full w-full" />,
  Services: <ShieldCheck className="h-full w-full" />,
  About: <Info className="h-full w-full" />,
  Portfolio: <Briefcase className="h-full w-full" />,
  Careers: <Users className="h-full w-full" />,
  Contact: <Mail className="h-full w-full" />,
};

const dockItems: DockItem[] = navLinks.map((link) => ({
  title: link.title,
  href: link.href,
  icon: iconByTitle[link.title] ?? <Home className="h-full w-full" />,
}));

// Text links for the top bar (Contact lives in the CTA button).
const topLinks = navLinks.filter((link) => link.title !== "Contact");

export default function Navbar() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
          <Link href="/" aria-label={brand.name} className="flex items-center">
            <Image
              src={brand.logo.mark}
              alt={brand.name}
              width={brand.logo.width}
              height={brand.logo.height}
              priority
              unoptimized
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {topLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
          >
            Begin Journey
          </Link>
        </div>
      </header>

      <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        <FloatingDock items={dockItems} mobileClassName="mb-0" />
      </div>
    </>
  );
}
