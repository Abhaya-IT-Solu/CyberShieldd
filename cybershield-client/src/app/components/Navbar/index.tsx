"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { AlignJustify, X } from "lucide-react";
import { useMediaQuery } from "../../hooks/use-media-query";
import clsx from "clsx";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 992px)");

  return (
    <header
      className={clsx(
        "flex gap-2 z-50 text-neutral-900 m-0",
        "bg-white sm:backdrop-blur-lg sm:border border-gray-200/80 ",
        "top-2 rounded-lg w-[100%] max-w-7xl  items-center justify-between mx-auto px-4 p-2 sticky"
      )}
    >
      {!isMobile ? (
        <>
          <Image
            src={"/brand/logo.png"}
            alt="logo"
            width={70}
            height={70}
          />

          <nav className="flex gap-7 font-medium">
            <a href="/">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
            <a href="/blog">Blog</a>
          </nav>

          <button className="text-lg h-10 px-4 rounded-lg text-white flex items-center gap-2 bg-neutral-800 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-2 before:bg-gradient-to-t before:from-neutral-800 before:to-neutral-300 before:rounded-t-lg transition-all group">
           <a href="/#contact">Contact</a> 
          </button>
        </>
      ) : (
        <Drawer.Root direction="left" open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Trigger className="px-2 text-white h-9 grid place-content-center bg-neutral-800 w-fit rounded-lg">
            <AlignJustify />
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content
              className="left-2 top-2 bottom-2 fixed z-50 outline-none w-72 flex"
              style={
                {
                  "--initial-transform": "calc(100% + 8px)",
                } as React.CSSProperties
              }
            >
              <div className="bg-gradient-to-t from-black via-neutral-800 to-neutral-950 border border-neutral-400 text-white p-2 h-full w-full grow flex flex-col rounded-[16px]">
                <div className="w-full flex justify-between">
                  <div className="flex gap-2 px-4 flex-shrink-0 items-center text-2xl font-semibold">
                    <Image
                      src={"/brand/logo.png"}
                      alt="logo"
                      width={70}
                      height={70}
                    />
                  </div>

                  <button
                    className="rounded-md w-fit bg-neutral-800 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </button>
                </div>

                <div className="rounded-b-md py-2 px-3">
                  <ul className="space-y-2">
                    <li className="hover:bg-neutral-800 cursor-pointer p-1.5 px-2 rounded-md">Home</li>
                    <li className="hover:bg-neutral-800 cursor-pointer p-1.5 px-2 rounded-md">Services</li>
                    <li className="hover:bg-neutral-800 cursor-pointer p-1.5 px-2 rounded-md">About</li>
                    <li className="hover:bg-neutral-800 cursor-pointer p-1.5 px-2 rounded-md">Testimonials</li>
                    <li className="hover:bg-neutral-800 cursor-pointer p-1.5 px-2 rounded-md">Blog</li>
                  </ul>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </header>
  );
}
