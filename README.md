# Goya AI — landing page

A concept landing page for Goya AI, a proposed boutique AI consultancy. Built to make an early
conversation between co-founder candidates concrete, not to launch. See [PLAN.md](PLAN.md) for the
reasoning behind the positioning, design system, and every section, and
[atico3-analysis.md](atico3-analysis.md) for the business-model thesis it's built on.

All copy and the brand name live in one file: [src/content/site.ts](src/content/site.ts). Rename the
company, swap the headline, or edit any section's copy there — no component needs to change.

## Development

```sh
npm install
npm run dev       # localhost:4321
```

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the static site to `./dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run astro check` | Type-check `.astro` files |

Static output, no backend. Astro + Tailwind CSS v4.

## Known gaps

- `goya.ai` is not owned — see PLAN.md "Pre-work findings" for the parked-domain and trademark notes.
- Team bios in `site.ts` are bracketed placeholders (`[Founder name]`, etc.) — fill in before sharing.
- No OG share image yet (1200×630 needed before this link goes anywhere social previews matter).
- Mobile layout is verified at the CSS level (correct Tailwind breakpoint output) but not yet
  confirmed by eye in a real browser — see PLAN.md's Verification section.
