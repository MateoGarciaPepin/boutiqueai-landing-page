// Single source of truth for brand name and copy. Change GOYA below to rename
// the company everywhere on the site — no component should hardcode "Goya".
// See PLAN.md for the reasoning behind every section.

export const BRAND = "Goya AI";
export const BRAND_SHORT = "Goya";
export const EMAIL = "hello@goya.ai"; // domain not yet secured — see PLAN.md "Pre-work findings"
export const CITY = "[CITY]"; // placeholder — not specified yet, fill in before shipping

export const nav = {
  links: [
    { label: "Method", href: "#method" },
    { label: "Engagements", href: "#engagements" },
    { label: "Team", href: "#team" },
  ],
  cta: { label: "Start a conversation", href: "#contact" },
};

// Three headline candidates. Swap ACTIVE_HEADLINE to try a different one —
// kept as an array instead of commented-out markup so the page always
// type-checks regardless of which is active.
const HEADLINES = [
  "We build the AI systems mid-market companies are told to wait for.",
  "Senior AI builders for companies too small for the enterprise queue.",
  "The AI practice for companies the big firms triage last.",
] as const;
const ACTIVE_HEADLINE = 0;

export const hero = {
  eyebrow: "Boutique AI consultancy",
  headline: HEADLINES[ACTIVE_HEADLINE],
  headlineAlternates: HEADLINES.filter((_, i) => i !== ACTIVE_HEADLINE),
  subhead:
    "A small team of AI engineers and product builders who scope, build, and stay accountable after launch. Workflow audits and custom tooling for teams getting started; production systems for teams ready to build.",
  primaryCta: { label: "Start a conversation", href: "#contact" },
  secondaryCta: { label: "See how we work", href: "#method" },
  // Very low-opacity background painting — see Hero.astro. Public domain,
  // self-hosted. No on-page credit line (removed on request); provenance is
  // documented in PLAN.md — Francisco Goya, The Forge, c. 1817, The Frick
  // Collection.
  bgImage: {
    src: "/images/goya-the-forge.jpg",
  },
};

// Cards are laid out as tiles after ansonybonet.com/projects: each leads with
// its outcome (`pull`, set in display type), then the detail, then one
// understated text link — shared `cta`, since there are no per-tier detail
// pages to send people to. `pull` is the old "Output:" line with the label
// prefix dropped so it reads as a headline, not a footnote; no new claims.
export const engagements = {
  gateway:
    "Most engagements start with Enablement. It's how we learn your workflows well enough to know whether a Systems engagement is worth doing, for you and for us.",
  cta: { label: "See how it works", href: "#method" },
  tiers: [
    {
      tag: "Tier 01",
      title: "Enablement",
      pull: "A prioritized roadmap, and a team that doesn't need us in the room.",
      dek: "Understand where AI tooling actually moves the needle, and get a team that can use it.",
      items: [
        "Workflow and tooling audit",
        "Hands-on coaching for the team doing the work",
        "Custom MCP servers and integrations where off-the-shelf tools stop",
      ],
    },
    {
      tag: "Tier 02",
      title: "Systems",
      pull: "A system in production, and the people who built it still on call.",
      dek: "Build and run the thing: agent architecture, application development, and the infrastructure to keep it in production.",
      items: [
        "Agent and application architecture",
        "Integration and infrastructure engineering",
        "Evaluation harnesses and production monitoring, shipped with the system, not after",
      ],
    },
  ],
};

// Illustrative scenarios — added on request. NOT case studies: there are no
// clients (see PLAN.md "Proof"). Each is a composite built from a real sector
// shape — hospitality/restaurant consulting, and extensive-livestock herd
// management — not a named company, and the section carries an "illustrative"
// label on the page so it can't be read as real client work. One scenario per
// engagement tier, so it reinforces the Engagements pitch rather than adding a
// separate claim. Both scenarios are LLM/agent work, matching what the two
// tiers actually sell.
export const illustrative = {
  heading: "How the tiers play out.",
  label: "Illustrative scenarios, not client work",
  scenarios: [
    {
      tier: "Enablement",
      situation: "A hospitality group opening venues across Europe",
      body: "Every opening rebuilt the same artifacts by hand: concept deck, location memo, menu costing, an operations manual. We mapped the opening workflow, then set the team up with AI drafting tools and a custom MCP server that reads their past projects, so a new opening starts from the group's own precedent, not a blank page.",
      result:
        "First-draft opening playbooks in an afternoon instead of a week, and a team that runs it without us.",
    },
    {
      tier: "Systems",
      situation: "A herd-management platform for extensive cattle ranches",
      body: "Ranchers had years of records in the platform — treatments, calvings, weights — but getting an answer out meant an Excel export, and the recurring vet and livestock-movement paperwork was still filled in by hand. We built an agent that answers questions over each ranch's own records in plain language and drafts the regulatory forms from the logbook, shipped with an evaluation harness that checks every answer against the source rows and production monitoring alongside it.",
      result:
        "Answers from the pasture instead of a spreadsheet, forms drafted in minutes, a wrong-answer rate the team can actually see — and the builders still on call.",
    },
  ],
};

// A direct, labeled comparison instead of a clever line. Two attempts before
// this one tried to be a "pitch" through implication (an inverted-defaults
// scale under a headline like "The model isn't new. The market is.") and
// both got called unclear. Root cause: on an AI company's own page, "the
// model isn't new" reads as being about AI models, not business models — and
// the argument depended on context from the Position section, which no
// longer exists on the page. Fix: say plainly who's being compared (column
// headers, not implication) and use plain words in the pairs themselves
// (no "retainer," no "agent stack"). Still grounded in atico3-analysis.md —
// production experience vs. templated resellers, direct access, audit before
// you commit, staying accountable post-launch — just stated instead of
// implied. Each scale always resolves right (us) — see Method.astro.
export const method = {
  heading: "Most AI shops are resellers. We're operators.",
  columnLeft: "Typical AI shop",
  columnRight: "Goya",
  scales: [
    { left: "Copy-paste templates", right: "Real production systems" },
    { left: "Account manager", right: "Whoever built it" },
    { left: "Buy blind", right: "Audit first" },
    { left: "Ship and move on", right: "Stay on the hook" },
  ],
};

// `photo` is null until real headshots are supplied (see PLAN.md — fetching
// them from LinkedIn automatically isn't something this build does; LinkedIn
// blocks/prohibits scraping profile data, headshots included, regardless of
// who's asking). Team.astro falls back to the monogram tile when null — drop
// a file in public/images/team/ and set the path here once you have one.
export const team = {
  heading: "Founding team.",
  founders: [
    {
      monogram: "AP",
      name: "Alfredo Poves Luelmo",
      role: "CEO / Founder",
      linkedin: "https://www.linkedin.com/in/alfredopoves/",
      photo: null as string | null,
    },
    {
      monogram: "MG",
      // Corrected from "Ppein" to "Pepin" — matches the spelling on file
      // for this account; flag if that's wrong.
      name: "Mateo Garcia Pepin",
      role: "Lead AI Engineer / Founder",
      linkedin: "https://www.linkedin.com/in/mateo-garcia-pepin/",
      photo: null as string | null,
    },
  ],
};

export const contact = {
  heading: "Tell us what's slow.",
  body: "We'll tell you within a week whether it's an AI problem, and whether we're the right people for it.",
  note: "No forms. No discovery-call scheduler. Just email.",
  email: EMAIL,
};

export const footer = {
  brand: BRAND,
  email: EMAIL,
  city: CITY,
};

export const meta = {
  title: `${BRAND} — Boutique AI consultancy`,
  description:
    "Goya AI is a boutique AI consultancy for mid-market companies: workflow enablement and production AI systems, built by a senior team with direct client access.",
};
