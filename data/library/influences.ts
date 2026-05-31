import type { LibraryEntry } from "./types";

// Sixteen specific brand/product influences. Traits describe widely-recognized
// design characteristics; palettes are representative references, not exact
// brand specifications.
export const influences: LibraryEntry[] = [
  {
    slug: "financial-times",
    name: "Financial Times",
    kind: "influence",
    tagline: "Authority on salmon-pink paper.",
    summary:
      "The FT pairs its signature warm paper background with a sober serif and a disciplined grid. Dense, credible, and unmistakably print-rooted on the web.",
    traits: [
      "Salmon-pink background",
      "Serif headlines",
      "Dense information grid",
      "Restrained accent color",
      "Strong reading hierarchy",
    ],
    palette: [
      { name: "FT Paper", hex: "#fff1e5" },
      { name: "Ink", hex: "#33302e" },
      { name: "Claret", hex: "#990f3d" },
      { name: "Teal", hex: "#0d7680" },
    ],
    typography:
      "A bespoke serif (Financier / Metric pairing) — serif for headlines, sans for UI.",
    tags: ["news", "editorial", "serif", "dense", "finance"],
    url: "https://www.ft.com",
  },
  {
    slug: "new-york-times",
    name: "New York Times",
    kind: "influence",
    tagline: "The standard for digital news.",
    summary:
      "Classic serif headlines, a measured reading column, and confident use of whitespace and imagery. Authoritative without feeling heavy.",
    traits: [
      "Cheltenham serif headlines",
      "Measured reading column",
      "Clear story hierarchy",
      "Subtle hairline rules",
      "Photo-led features",
    ],
    palette: [
      { name: "White", hex: "#ffffff" },
      { name: "Ink", hex: "#121212" },
      { name: "Gray", hex: "#666666" },
      { name: "Link", hex: "#326891" },
    ],
    typography:
      "Cheltenham for headlines, a clean sans for UI and captions, Georgia-like body.",
    tags: ["news", "editorial", "serif", "authoritative"],
    url: "https://www.nytimes.com",
  },
  {
    slug: "bloomberg",
    name: "Bloomberg",
    kind: "influence",
    tagline: "Terminal energy, editorial edge.",
    summary:
      "Bloomberg mixes dense financial data with bold, sometimes experimental editorial design. Tables and tickers meet striking typographic features.",
    traits: [
      "Data-dense tables",
      "Bold experimental features",
      "Strong charts and tickers",
      "High-contrast accents",
      "Mixed serif/sans system",
    ],
    palette: [
      { name: "Black", hex: "#000000" },
      { name: "Signal", hex: "#fa4d56" },
      { name: "White", hex: "#ffffff" },
      { name: "Data Blue", hex: "#1f6feb" },
    ],
    typography:
      "A pragmatic sans for data, expressive display type for features.",
    tags: ["finance", "data", "tables", "editorial", "bold"],
    url: "https://www.bloomberg.com",
  },
  {
    slug: "reuters",
    name: "Reuters",
    kind: "influence",
    tagline: "Neutral, fast, and global.",
    summary:
      "Wire-service clarity: clean sans typography, an orange accent, and layouts optimized for speed and scanning across many stories.",
    traits: [
      "Clean sans typography",
      "Orange accent",
      "Scannable story lists",
      "Restrained imagery",
      "Fast, utilitarian layout",
    ],
    palette: [
      { name: "White", hex: "#ffffff" },
      { name: "Reuters Orange", hex: "#ff8000" },
      { name: "Ink", hex: "#1a1a1a" },
      { name: "Gray", hex: "#5f6b7a" },
    ],
    typography:
      "A neutral sans across headlines and body, optimized for legibility at speed.",
    tags: ["news", "wire", "neutral", "scannable"],
    url: "https://www.reuters.com",
  },
  {
    slug: "apple",
    name: "Apple",
    kind: "influence",
    tagline: "The product is the page.",
    summary:
      "Cinematic marketing with oversized type, centered product imagery, deep blacks, and scroll choreography. The benchmark for premium restraint.",
    traits: [
      "Oversized headings",
      "Centered hero product",
      "Generous whitespace",
      "Scroll-driven reveals",
      "Subtle blur and depth",
    ],
    palette: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Graphite", hex: "#86868b" },
      { name: "Link Blue", hex: "#0066cc" },
    ],
    typography:
      "San Francisco — very large, tight headings; quiet, legible body.",
    tags: ["premium", "marketing", "spacious", "cinematic", "product"],
    url: "https://www.apple.com",
  },
  {
    slug: "stripe",
    name: "Stripe",
    kind: "influence",
    tagline: "Developer-grade polish.",
    summary:
      "Stripe set the template for modern fintech: animated gradients, crisp typography, immaculate spacing, and documentation that feels like a product.",
    traits: [
      "Animated gradient meshes",
      "Crisp, precise spacing",
      "Beautiful code blocks",
      "Subtle, purposeful motion",
      "Layered depth",
    ],
    palette: [
      { name: "Stripe Purple", hex: "#635bff" },
      { name: "Ink", hex: "#0a2540" },
      { name: "Sky", hex: "#00d4ff" },
      { name: "Cloud", hex: "#f6f9fc" },
    ],
    typography:
      "A clean sans (Stripe's own / Inter-like) with carefully tuned sizes and weights.",
    tags: ["saas", "fintech", "gradient", "developer", "polished"],
    url: "https://stripe.com",
  },
  {
    slug: "linear",
    name: "Linear",
    kind: "influence",
    tagline: "Speed, restraint, and dark elegance.",
    summary:
      "Linear made restraint aspirational: a dark theme, subtle gradients, fast keyboard-first UI, and crisp typography with just enough glow.",
    traits: [
      "Dark theme with subtle gradients",
      "Keyboard-first interactions",
      "Crisp, compact typography",
      "Restrained color",
      "Fast, fluid motion",
    ],
    palette: [
      { name: "Black", hex: "#08090a" },
      { name: "Surface", hex: "#16171b" },
      { name: "Linear Violet", hex: "#5e6ad2" },
      { name: "Mist", hex: "#8a8f98" },
    ],
    typography:
      "Inter (custom-tuned) at compact sizes with tight, deliberate spacing.",
    tags: ["dark", "product", "restrained", "fast", "modern"],
    url: "https://linear.app",
  },
  {
    slug: "vercel",
    name: "Vercel",
    kind: "influence",
    tagline: "High-contrast black and white.",
    summary:
      "Stark monochrome with one geometric mark. Sharp typography, generous black, and tasteful gradients reserved for moments that matter.",
    traits: [
      "Black and white base",
      "Geometric triangle mark",
      "Sharp, modern sans",
      "Occasional vivid gradients",
      "Clean developer aesthetic",
    ],
    palette: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Gray", hex: "#888888" },
      { name: "Line", hex: "#eaeaea" },
    ],
    typography:
      "Geist — Vercel's own sans and mono — with high-contrast headings.",
    tags: ["monochrome", "developer", "minimal", "sharp"],
    url: "https://vercel.com",
  },
  {
    slug: "github",
    name: "GitHub",
    kind: "influence",
    tagline: "Dense utility done well.",
    summary:
      "A vast, functional UI that stays legible: tight tables, clear states, robust light and dark themes, and a system (Primer) behind every pixel.",
    traits: [
      "Information-dense layouts",
      "Primer design system",
      "Robust light/dark themes",
      "Clear status colors",
      "Compact, legible tables",
    ],
    palette: [
      { name: "Canvas", hex: "#ffffff" },
      { name: "Ink", hex: "#1f2328" },
      { name: "Link", hex: "#0969da" },
      { name: "Success", hex: "#1a7f37" },
    ],
    typography:
      "A system sans stack with mono for code; compact sizing for density.",
    tags: ["developer", "dense", "system", "ui", "tables"],
    url: "https://github.com",
  },
  {
    slug: "letterboxd",
    name: "Letterboxd",
    kind: "influence",
    tagline: "Dark, poster-led, and personal.",
    summary:
      "A film-lover's home: a dark canvas that lets movie posters glow, friendly rounded UI, and a warm tricolor accent system.",
    traits: [
      "Dark, poster-forward canvas",
      "Grid of vivid posters",
      "Rounded, friendly UI",
      "Tricolor accent dots",
      "Social, personal tone",
    ],
    palette: [
      { name: "Charcoal", hex: "#14181c" },
      { name: "Green", hex: "#00e054" },
      { name: "Blue", hex: "#40bcf4" },
      { name: "Orange", hex: "#ff8000" },
    ],
    typography:
      "A clean humanist sans with comfortable sizing over dark surfaces.",
    tags: ["dark", "media", "social", "grid", "imagery"],
    url: "https://letterboxd.com",
  },
  {
    slug: "airbnb",
    name: "Airbnb",
    kind: "influence",
    tagline: "Warm, photographic, human.",
    summary:
      "Big imagery, rounded cards, soft shadows, and a warm coral accent. A friendly, trustworthy marketplace feel built on a strong design system.",
    traits: [
      "Photography-led cards",
      "Rounded corners and soft shadows",
      "Warm coral accent",
      "Generous touch targets",
      "Consistent design system",
    ],
    palette: [
      { name: "Rausch", hex: "#ff385c" },
      { name: "Ink", hex: "#222222" },
      { name: "Gray", hex: "#717171" },
      { name: "Cloud", hex: "#f7f7f7" },
    ],
    typography:
      "A friendly proprietary sans (Cereal) with clear, comfortable hierarchy.",
    tags: ["marketplace", "warm", "imagery", "friendly", "system"],
    url: "https://www.airbnb.com",
  },
  {
    slug: "notion",
    name: "Notion",
    kind: "influence",
    tagline: "Calm, blocky, document-first.",
    summary:
      "A near-white canvas, monochrome UI, playful illustrations, and block-based editing. Calm and content-forward, with personality at the edges.",
    traits: [
      "Near-white canvas",
      "Monochrome UI chrome",
      "Block-based layout",
      "Hand-drawn illustrations",
      "Calm, spacious feel",
    ],
    palette: [
      { name: "Paper", hex: "#ffffff" },
      { name: "Ink", hex: "#191919" },
      { name: "Gray", hex: "#787774" },
      { name: "Tint", hex: "#f1f1ef" },
    ],
    typography:
      "A clean system sans with a comfortable document reading width.",
    tags: ["productivity", "calm", "document", "monochrome"],
    url: "https://www.notion.com",
  },
  {
    slug: "arc-browser",
    name: "Arc Browser",
    kind: "influence",
    tagline: "Colorful, fluid, opinionated.",
    summary:
      "Arc brings expressive gradients, springy motion, and a sidebar-first layout. Playful and bold where most browsers are invisible.",
    traits: [
      "Expressive gradients",
      "Springy, fluid motion",
      "Sidebar-first navigation",
      "Custom per-space theming",
      "Bold, opinionated UI",
    ],
    palette: [
      { name: "Gradient A", hex: "#ff6b6b" },
      { name: "Gradient B", hex: "#7b61ff" },
      { name: "Ink", hex: "#1c1c1e" },
      { name: "Cloud", hex: "#f5f5f7" },
    ],
    typography:
      "A friendly modern sans with rounded, approachable headings.",
    tags: ["browser", "colorful", "motion", "playful", "bold"],
    url: "https://arc.net",
  },
  {
    slug: "the-economist",
    name: "The Economist",
    kind: "influence",
    tagline: "A red box and a clear argument.",
    summary:
      "Instantly recognizable: the red masthead box, a sober serif, disciplined charts, and an authoritative, no-byline editorial voice.",
    traits: [
      "Signature red masthead box",
      "Sober serif typography",
      "Distinctive house charts",
      "Disciplined grid",
      "Authoritative tone",
    ],
    palette: [
      { name: "Economist Red", hex: "#e3120b" },
      { name: "Ink", hex: "#121212" },
      { name: "Paper", hex: "#ffffff" },
      { name: "Chart Blue", hex: "#006ba2" },
    ],
    typography:
      "An Economist serif (Milo-based) for body, a clean sans for labels and charts.",
    tags: ["news", "editorial", "serif", "charts", "authoritative"],
    url: "https://www.economist.com",
  },
  {
    slug: "monocle",
    name: "Monocle",
    kind: "influence",
    tagline: "Print sensibility, cosmopolitan calm.",
    summary:
      "A magazine-first aesthetic: warm paper tones, classic serifs, considered photography, and an understated, well-travelled editorial voice.",
    traits: [
      "Warm paper tones",
      "Classic serif type",
      "Considered photography",
      "Generous margins",
      "Understated palette",
    ],
    palette: [
      { name: "Paper", hex: "#f7f4ee" },
      { name: "Ink", hex: "#222019" },
      { name: "Accent", hex: "#b1402f" },
      { name: "Sage", hex: "#7d8466" },
    ],
    typography:
      "Refined serifs for editorial, a quiet sans for navigation and captions.",
    tags: ["magazine", "editorial", "warm", "refined", "print"],
    url: "https://monocle.com",
  },
  {
    slug: "openai",
    name: "OpenAI",
    kind: "influence",
    tagline: "Quiet, neutral, conversational.",
    summary:
      "A restrained near-monochrome system: lots of whitespace, a soft neutral palette, simple geometric mark, and a calm conversational interface.",
    traits: [
      "Near-monochrome neutrals",
      "Abundant whitespace",
      "Simple geometric mark",
      "Conversational, minimal UI",
      "Soft, low-contrast surfaces",
    ],
    palette: [
      { name: "White", hex: "#ffffff" },
      { name: "Ink", hex: "#202123" },
      { name: "Gray", hex: "#6e6e80" },
      { name: "Tint", hex: "#f7f7f8" },
    ],
    typography:
      "A clean neutral sans with comfortable sizing and a calm hierarchy.",
    tags: ["ai", "minimal", "neutral", "calm", "conversational"],
    url: "https://openai.com",
  },
];
