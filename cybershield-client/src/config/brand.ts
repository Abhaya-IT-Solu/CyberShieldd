// Central brand config. Swap these placeholder values when the new brand
// identity (name, logo, colors, copy) is finalized -- every component below
// reads from here instead of hardcoding brand details.

export const brand = {
  name: "Gravincy",
  shortName: "Gravincy",
  /** Canonical origin — used for metadataBase, sitemap, and robots. */
  siteUrl: "https://abhayaitsolutions.online",
  tagline: "[Your tagline goes here]",
  description:
    "[One to two sentence description of what the company does and who it serves.]",
  logo: {
    // Intrinsic dimensions of the file — display size is controlled with
    // CSS (e.g. `h-9 w-auto`); these only preserve the aspect ratio.
    // logo.png is 434x112. Update these if you swap in a different file.
    mark: "/brand/logo.png",
    width: 434,
    height: 112,
  },
  contact: {
    email: "contact@gravincy.com",
    phone: "+91 9503705181",
    location: "Pune, Maharashtra, India",
  },
  socials: [
    { name: "LinkedIn", href: "https://linkedin.com/" },
    { name: "Instagram", href: "https://instagram.com/" },
    { name: "GitHub", href: "https://github.com/" },
  ],
} as const;

export type NavLink = {
  title: string;
  href: string;
};

// Primary navigation -- shared by the Navbar (floating dock) and mobile menu.
export const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
];
