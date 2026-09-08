# Goya AI — landing page plan

Working document. Nothing here is built yet. The build happens in a later session; this exists to be
read, argued with, and edited first.

## Context

The idea is a boutique AI consultancy aimed at small and mid-market companies, the GTM segment large
firms neglect. The thesis is documented in [atico3-analysis.md](atico3-analysis.md): take Atico3's
shape (senior-only, no PMs, two-tier monthly retainer, audit-as-front-door) and port it to AI
enablement and AI systems work.

The landing page is not a launch asset. It exists to make an early conversation with a co-founder
candidate concrete, to argue the positioning visually before either person commits. That framing
drives every decision below: the page must read as a company that already has a point of view, while
staying honest that there are no clients yet.

Repo currently holds only `README.md` and `atico3-analysis.md`.

## Pre-work findings (not blocking the build; decide before spending money)

- `goya.ai` is registered and parked on GoDaddy's for-sale marketplace (307 redirect to
  `forsale.godaddy.com/forsale/goya.ai`). Asking price not retrievable, GoDaddy 403s automated
  fetches. Fallbacks to price-check: `goyalabs.ai`, `goya.dev`, `goya.studio`, `withgoya.com`.
- Goya Foods actively enforces the GOYA mark. Nearest precedent found: an EU consultancy registered
  "Goya" for telecommunication services over Goya Foods' opposition in 2025
  ([Law360](https://www.law360.com/articles/2326349/goya-foods-not-reputable-enough-to-nix-rival-s-goya-tm)).
  Encouraging for a consulting-services mark in the EU, not dispositive. Get a clearance search
  before buying. This is not legal advice.
- Mitigation baked into the build: the brand name lives in exactly one constant
  (`src/content/site.ts`), so a rename costs one edit.

## Design reference research

surge.ai, tastelabs.com and figma.com all return 403 to automated fetches, so they could not be read
directly. One grounded observation: Taste Labs uses a cream paper palette, Sentient display type, and
a floating pill nav ([AI UX Playground](https://aiuxplayground.com/playground/taste-lab/)).
Everything else about those three references is general knowledge, unverified.

## Decisions taken

| Decision | Choice |
|---|---|
| Aesthetic | Paper & ink: warm cream, warm oxblood-black, oxide-red text accent + ember for decorative rules/dots, serif display + mono labels |
| Stack | Astro + Tailwind v4, static output |
| Proof | Founding-team provenance, plus two labelled illustrative scenarios (2026-09-08, see "Illustrative" below); no logo walls, no client claims, no fabricated metrics |
| Pricing | Engagement shape, staffing and duration; no figures |
| Copy | English only, EU-leaning framing |

---

## Design system

Tokens go in `src/styles/global.css` as a Tailwind v4 `@theme` block (v4 is CSS-first; there is no
`tailwind.config.js`).

**Color**

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#F4F1EA` | page ground |
| `--color-ink` | `#20110D` | headings, body |
| `--color-oxide` | `#A8422A` | text links, accent text, one word per headline at most |
| `--color-ember` | `#D6482F` | decorative rules and dots only — never text |
| `--color-ink-60` | `#20110D` @ 60% | secondary body, eyebrow labels, meta |
| `--color-rule` | `#20110D` @ 12% | hairlines |

`ink` was `#16130F` (a near-neutral black) through the initial build; shifted 2026-09-08 to a warm
oxblood-black after [ansonybonet.com](https://ansonybonet.com/projects/), whose body text is a deep
wine rather than black. `#20110D` sits at the same relative luminance as `#16130F`, so every
contrast figure below still holds — `ink-60` recomputed to **4.64:1**, still AA. A lighter oxblood
(`#241512`) was tried first and dropped `ink-60` to ~4.5:1, on the AA line. `ember` is a hotter red
used only for the Engagements top rules and the Method scale dots (decorative, ~3.9:1 on paper,
above the 3:1 non-text floor); it is never used for text or as a text background, where it fails AA.

Oxide on paper computes to **5.35:1** contrast, passes WCAG AA for normal text at any size, fails
AAA. `ink` at 60% opacity computes to **4.64:1**, also AA. The original draft used `ink` at 40%
(`#16130F` at 0.4 alpha over `#F4F1EA`) for eyebrow labels and footer meta; that blends to roughly
**2.55:1**, well under the 4.5:1 AA floor for normal text — caught by computing contrast on the built
site rather than eyeballing it, and fixed by moving those uses to `ink-60`. `ink-40` is not used
anywhere in the shipped page.

**Type** — all three faces are on Google Fonts, self-hosted via `@fontsource` packages rather than
Google's CDN (avoids a third-party request and the EU hotlinking-GDPR question):

- Display: **Fraunces** (variable) — `clamp(2.75rem, 6vw, 5.5rem)` on the hero, tracking -0.01em.
  Chosen over Instrument Serif, Newsreader, Libre Caslon Display, and Space Grotesk after a live
  side-by-side comparison at `/type-test` (built, reviewed, then deleted once the call was made —
  see git history if it's needed again). Instrument Serif read too thin/precious at display size.
- Body: **Inter Tight** — `clamp(1.0625rem, 1.2vw, 1.125rem)`, line-height 1.6
- Labels: **Space Mono** — 11px, uppercase, tracking 0.12em, `--color-ink-60`. Third mono in this
  project: Geist Mono (original) → IBM Plex Mono (disliked, picked directly without a comparison,
  which turned out to be a mistake) → **Space Mono** (current). The direct pick taught the lesson a
  side-by-side would have caught immediately: at 11px uppercase-tracked, most clean grotesk-monos
  (IBM Plex, JetBrains, Martian, Azeret, Spline Sans — all tried at `/mono-test`, built and deleted
  same as the type-test) read as near-identical, because the letterform details that make them
  distinct usually live in lowercase and numerals, and this site's mono usage is almost entirely
  uppercase. Space Mono was the one candidate across both rounds with an unmistakable difference in
  caps — flat-topped A, heavier stroke weight — visible at a glance, no side-by-side needed. Static
  weight only (no variable axis, not needed at one weight).

**Layout** — 12 columns, `max-width: 1180px`, gutters 24px mobile / 48px desktop, single column per
section (no sidebar). The original draft's "signature move" was a numbered index column (mono
`0X — SECTION` label pinned left, content right) running down the whole page. Removed on explicit
feedback — it read as bureaucratic rather than confident. Sections now just stack: heading, then
content, full width, separated by a full-bleed hairline.

**Motion** — one `IntersectionObserver`, ~30 lines inline: 12px fade-up, 400ms, 60ms stagger, fires
once. Entirely gated behind `prefers-reduced-motion: no-preference`; with motion reduced, content
renders visible with no transition. No parallax, no scroll-jacking.

---

## Sections

**Nav** — wordmark left, three anchors (Method, Engagements, Team), `Start a conversation` right.
Transparent at rest; hairline bottom border fades in past 40px scroll.

**Hero** — mono eyebrow, serif headline over 2–3 lines, one plain-language subhead, primary CTA plus
an anchor to Method. Headline must name the neglected segment rather than describe services; three
options are drafted in `site.ts` (`ACTIVE_HEADLINE` picks which). Background carries a very
low-opacity (9%, bumped up from an initial 5% on request), grayscale, multiply-blended painting —
Goya's *The Forge* (La Fragua, c. 1817, Frick Collection, public domain), self-hosted at
`public/images/goya-the-forge.jpg`, sourced from Wikimedia Commons and downsized from the original
~11MB scan to ~560KB. Chosen for tonal contrast (reads at low opacity when flatter paintings wouldn't)
and thematic fit (forging metal ≈ building systems) over anything from Goya's darker or more
disturbing periods. No on-page credit (removed on request) — provenance is recorded here and in a
`site.ts` comment instead. Swap the file in `site.ts` (`hero.bgImage.src`) if a different painting
fits better — the specific artwork wasn't a hard requirement, just "mildly, almost invisible."

**Position section — removed.** The original draft had a `01 — POSITION` section carrying the
enterprise-vs-mid-market argument from `atico3-analysis.md` as three paragraphs. Cut on explicit
feedback. Some of that argument now lives compressed in Method's scales instead of as prose.

**Engagements** — the commercial core. No section heading (the original "Two ways in." was cut on
explicit feedback — the two card titles already say what they are). Two bordered cards, full width,
each with: a small original line-art mark (a compass for Enablement, a three-node graph for Systems —
hand-drawn inline SVG, not a third-party logo; putting real companies' logos here would imply a
partnership that doesn't exist), an ember top rule, tag, title, dek, item list, and an output line. No
cadence/pricing line under either card — cut on explicit feedback ("Fixed scope. Weeks, not quarters."
and its Systems equivalent).

Restyled 2026-09-08 as tiles after [ansonybonet.com/projects](https://ansonybonet.com/projects/):
the outcome line moves up under the title and is set in display type (`pull` in `site.ts` — the old
"Output:" text with the label prefix dropped, no new claims), and each card ends with one understated
mono text link ("See how it works →", both pointing at `#method` since there are no per-tier detail
pages). The link is pinned to the card's bottom edge (`mt-auto` in a flex column) so both cards' links
align regardless of body height. Tiers:

- *Enablement* — map how teams actually work, find where AI tooling moves the needle. Workflow audit,
  tooling selection, hands-on coaching, custom MCP servers where off-the-shelf stops. Output: a
  prioritized roadmap and a team that can use what already exists.
- *Systems* — build and run the thing. Agent architecture, app development, integration engineering,
  evaluation harnesses, production monitoring. Output: a system in production, builders still on call.

Plus an explicit gateway line: Enablement is how engagements start, and how we find out whether a
Systems engagement is worth doing.

**Illustrative** — added 2026-09-08 on request, sits between Engagements and Method. One composite
scenario per tier: *Enablement* — a hospitality group standardising its opening workflow with AI
drafting tools and a precedent-reading MCP server; *Systems* — a herd-management platform getting
an LLM agent that answers questions over each ranch's own records and drafts regulatory paperwork
from the logbook, shipped with an eval harness and production monitoring. Both are LLM/agent work,
matching what the tiers sell (an earlier draft had the Systems one as movement-data anomaly
detection; changed on request). This is the "no invented case studies" line bending, not breaking:
the composites are built from sector shapes (drawn from [ansonybonet.com](https://ansonybonet.com/)
and [ixorigue.com](https://ixorigue.com/en), neither named), no clients are claimed, no metrics are
fabricated (outcomes are directional —
"an afternoon instead of a week"), and the section header carries the label *"Illustrative
scenarios, not client work"* so it can't be mistaken for real engagements. Editorial rows (mono
tier tag + narrative + an ember-ruled result line), deliberately not the Engagements card
treatment. `id="scenarios"`, not added to the nav — it is supporting material, not a primary
destination. Remove the whole block (component + `illustrative` export) the moment there is real
client work to replace it with.

**Method** — a pitch, not an explanation. Same scale device throughout (status-quo label, thin line,
ember dot pinned right, our answer in large serif type — always resolving in our favor), but the
copy went through three passes:

1. Five explained principles (title + two sentences each) — the original draft. Read like
   documentation, cut on explicit feedback ("a pitch, not an explanation").
2. An inverted-defaults scale under a clever headline ("The model isn't new. The market is." /
   "Proven elsewhere. Rare in AI.") — reframed around the real thesis in `atico3-analysis.md`, but
   still called unclear. Root cause on inspection: "the model isn't new" reads as being about AI
   models on an AI company's own page, not business models, and the argument leaned on context from
   the Position section, which no longer exists on the page.
3. **Current** — say it plainly instead of implying it. Heading: **"Most AI shops are resellers.
   We're operators."** Two column headers make the comparison explicit rather than inferred from
   position alone: **Typical AI shop** / **Goya** (the brand name directly, not "us" — unambiguous).
   Pairs use plain words, no consulting or engineering jargon ("retainer," "agent stack" both cut):
   *Copy-paste templates → Real production systems. Account manager → Whoever built it. Buy blind →
   Audit first. Ship and move on → Stay on the hook.* Same underlying argument as pass 2 (production
   experience vs. templated resellers, direct access, audit before commitment, staying accountable
   post-launch) — just stated, not implied. Each row also carries a screen-reader-only
   "Typical AI shop:" / "Goya:" prefix so the pairing survives outside the visual column-header
   context, not just the one visible header row at the top of the list.

**Team** — founder cards: monogram (or photo, once supplied), name, role, LinkedIn link. Bio copy was
cut on explicit feedback. Real people now, not placeholders: **Alfredo Poves Luelmo**, CEO / Founder
([LinkedIn](https://www.linkedin.com/in/alfredopoves/)), and **Mateo Garcia Pepin**, Lead AI Engineer
/ Founder ([LinkedIn](https://www.linkedin.com/in/mateo-garcia-pepin/)) — the name was given as "Ppein"
in chat and corrected to "Pepin" to match the LinkedIn handle and the account's own email; flag if
that's wrong. `photo` is `null` in `site.ts` for both — headshots weren't fetched automatically.
LinkedIn actively blocks/prohibits scraping profile data, including photos, and that holds regardless
of whose profile it is or how legitimate the end use is; the fix is a human downloading their own
photo (a few clicks, entirely within their rights) and handing over the file. Card border is solid
now, not dashed — dashed was signaling "placeholder," which stopped being true once the content
became real; the monogram fallback alone doesn't need that signal.

**Contact** — sets expectations rather than harvesting leads: tell us what's slow, we'll tell you
within a week whether it's an AI problem and whether we're the right people. Mechanism is a `mailto:`
link — zero backend, no privacy-policy burden for a concept page. Upgrade path to Formspree or a
Vercel function noted in a comment.

**Footer** — wordmark, email, city, year. One line.

---

## Files

```
package.json, astro.config.mjs, tsconfig.json
src/
  content/site.ts        # ALL copy + brand name, single source of truth
  styles/global.css      # @theme tokens, base styles
  layouts/Base.astro     # head, fonts, meta, OG tags, skip link
  pages/index.astro      # composes the sections
  components/
    Nav.astro  Hero.astro  Engagements.astro  Illustrative.astro
    Method.astro  Team.astro  Contact.astro  Footer.astro
    Container.astro      # page-width wrapper, reused everywhere
    Reveal.astro          # scroll-reveal wrapper, reused throughout
public/
  favicon.svg  og.png (still missing, see "Known gaps")
  images/goya-the-forge.jpg   # hero background, self-hosted
```

`src/content/site.ts` is the load-bearing structural choice: iterating copy, or renaming the company,
never requires touching markup.

## Build order

1. `npm create astro@latest` (minimal, TypeScript), then `npx astro add tailwind` — for Astro 5.2+
   this wires Tailwind v4 through `@tailwindcss/vite`; the old `@astrojs/tailwind` integration is
   legacy and Tailwind-3 only ([Astro styling docs](https://docs.astro.build/en/guides/styling/)).
2. Install `@fontsource-variable/fraunces`, `@fontsource-variable/inter-tight`,
   `@fontsource/space-mono` (static, latin-400 only — no variable build exists for this one).
3. Tokens in `global.css`, then `Base.astro` and the grid primitives.
4. `site.ts` with full copy — this is the real work, and the point where review matters most before
   any styling gets applied.
5. Sections in page order, each behind `Reveal`.
6. Favicon and OG image last.

## Verification — what was actually checked

- `npx astro check`: 0 errors, 0 warnings, 1 informational hint (unused `Props` type reference in
  `Reveal.astro`, harmless).
- `npm run build`: succeeds. All script tags are small enough that Astro inlines them straight into
  `index.html` rather than emitting separate `.js` files — the whole page ships with no external JS
  request at all, better than the ~1KB budget this plan set.
- Built `index.html` inspected directly: correct `<title>`/meta description, single `favicon.svg`
  reference (no stray `.ico`), `lang="en"`, one `<h1>` with clean `h2`/`h3` hierarchy below it, no
  console-relevant markup issues.
- Desktop layout confirmed visually via a real screenshot (headless Chrome at 1440px, full page):
  matches the paper & ink direction — hairline section rules, mono eyebrows, serif headline, oxide
  accents on tier tags/list markers/numbers, dashed placeholder cards for the team section. See
  Nav → Hero → Position → Engagements → Method → Team → Contact → Footer, all rendering in order.
- **Contrast audit, computed rather than eyeballed**: caught `ink` at 40% opacity (eyebrow labels,
  footer meta) blending to ~2.55:1 against paper, under the 4.5:1 AA floor. Fixed by moving every
  such use to `ink-60` (~4.65:1). Oxide at full opacity (5.35:1) and `ink-70` (~6.5:1, body copy)
  both already cleared AA. See the corrected color table above.
- **Mobile layout NOT visually confirmed.** This sandbox's headless Chrome (152.0.7977.82) ignores
  `--window-size` for the actual layout viewport regardless of flags tried (`--headless=new` vs
  legacy, `--force-device-scale-factor`, minimal flag sets) — confirmed with an isolated test page
  reporting `innerWidth=500` no matter what size was requested; the output PNG's pixel dimensions
  honor the request, but the content is laid out for a fixed ~500px viewport and then cropped into
  that canvas, not reflowed. So a "mobile screenshot" from this tool would show clipped desktop
  layout, not real mobile rendering, and would be misleading to report as a check.
  Verified instead at the CSS level: `dist/_astro/*.css` contains a correct
  `@media (width>=48rem)` block (Tailwind v4's standard 768px `md:` breakpoint) gating `.hidden`,
  `.md\:flex`, `.md\:grid-cols-2`, `.md\:col-span-3/9` exactly as used in the components — standard,
  well-tested Tailwind output, so real browsers should collapse to single-column / hide the desktop
  nav links correctly below 768px. **Open item**: confirm this visually in an actual browser
  (`npm run dev`, resize to 375/768px, or a phone) before treating mobile as done.
- Not checked this session: Lighthouse score, full keyboard-only pass, OS reduce-motion toggle. The
  reduced-motion CSS path exists (`global.css`, gated on `prefers-reduced-motion: reduce`) but
  wasn't exercised against a real OS setting.

## Deployment

Added 2026-09-08 to share the page with a co-founder candidate; domain deferred. GitHub Pages
*project* site off the existing repo: `.github/workflows/deploy.yml` runs `withastro/action@v3`
(Node 22, to match `package.json` engines) then `actions/deploy-pages` on every push to `main`.
`astro.config.mjs` gained `site: 'https://mateogarciapepin.github.io'` and
`base: '/boutiqueai-landing-page'`; the two `public/` asset refs (favicon in `Base.astro`, hero
painting in `Hero.astro`) are prefixed with `import.meta.env.BASE_URL` so they resolve under the
subpath. Verified locally by serving `dist/` under a `/boutiqueai-landing-page/` prefix — CSS,
fonts, favicon, hero image all 200.

One-time repo setup (not automatable from here): Settings → Pages → Source = **GitHub Actions**.
If the repo is private on a Free plan, Pages will not publish — make it public or upgrade. Live at
`https://mateogarciapepin.github.io/boutiqueai-landing-page/`.

Shipped with the known placeholders still in (`CITY` renders as `[CITY]` in the footer, `EMAIL` is
the unsecured `hello@goya.ai`) — a deliberate call for a link shared with one person, not a fix to
forget. Custom domain, when there is one: add a `public/CNAME` file and set `site`/`base`
accordingly.

## Explicitly out of scope

Analytics, a CMS, a blog, a real form backend, and multi-language. All are easy to add
onto this structure; none belong in a page whose job is to make one conversation concrete.

## Open questions

- **"Almost passing as an AI lab" is the riskiest instruction in the brief.** It buys attention from
  technical buyers and costs trust with the mid-market operations people who actually sign these
  contracts, because the lab register is abstract and they need to know what they are buying. With
  the Position section cut, the lab register now lives mainly in the visual system (paper & ink,
  the hero painting, custom marks) and in Method's scale device; Engagements and Contact stay blunt,
  operator-facing copy. Going further toward either pole is a `site.ts` copy change, not a rebuild.
- **Which Goya painting** for the hero background was an open question in the original draft —
  specifically flagging *The Sleep of Reason Produces Monsters* as apt but too on-the-nose. Resolved
  by using *The Forge* instead (see "Sections" → Hero): less loaded subject matter, still thematically
  tied to building things, and better tonal contrast at near-zero opacity. Easy to swap if it doesn't
  land — see the credit line in `site.ts`.
- **Pricing** is currently shape-and-duration with no figures. Revisit once there is a validated
  number to anchor on.
