# Project screenshots

Drop portfolio project images in this folder, then reference them from
`src/app/portfolio/PortfolioClient.tsx` in each project's `images` array.

## How to add

1. Save the file here, e.g. `public/projects/acme-dashboard.png`
2. Reference it with a **root-relative path** (note: no `public/` prefix):

```ts
{
  index: "01",
  title: "Acme Platform",
  // ...
  images: [
    "/projects/acme-dashboard.png",
    "/projects/acme-checkout.png",
    "/projects/acme-mobile.png",
    "/projects/acme-admin.png",
  ],
}
```

## Notes

- Up to **4** images are used per project — they become the floating
  background cards that parallax with the cursor.
- The **first** image is also used as the cover at the top of the
  case-study modal.
- Any slot left empty falls back to the abstract gradient mockup, so you can
  add 1 image now and the rest later.
- Recommended: **16:10 aspect ratio**, around 1200×750, `.png`/`.jpg`/`.webp`.
  They render small (~320px wide), so keep file sizes lean.
- These are served by `next/image` and optimized automatically.

## Using externally hosted images instead

If you'd rather host on a CDN, use the full URL in `images` and add the
hostname to `images.remotePatterns` in `next.config.ts`. Cloudinary and
Unsplash are already allowed.
