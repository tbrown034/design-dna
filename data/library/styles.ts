import type { LibraryEntry } from "./types";

// Twenty generic design styles. Palettes are representative, not prescriptive.
export const styles: LibraryEntry[] = [
  {
    slug: "minimalist",
    examples: [
      { name: "Apple", url: "https://www.apple.com" },
      { name: "Notion", url: "https://www.notion.com" },
    ],
    name: "Minimalist",
    kind: "style",
    tagline: "Say more with less.",
    summary:
      "Generous whitespace, a tight type scale, and a near-absence of ornament. Every element earns its place; restraint is the point of view.",
    traits: [
      "Abundant whitespace",
      "Limited palette",
      "Few type sizes",
      "No decorative borders",
      "Content-first hierarchy",
    ],
    palette: [
      { name: "Paper", hex: "#ffffff" },
      { name: "Ink", hex: "#111111" },
      { name: "Mist", hex: "#f3f3f3" },
      { name: "Accent", hex: "#2563eb" },
    ],
    typography:
      "One neutral sans (e.g. Inter or Helvetica) at two or three sizes, tight tracking, lots of leading.",
    tags: ["calm", "neutral", "spacious", "modern"],
  },
  {
    slug: "brutalist",
    examples: [
      { name: "Craigslist", url: "https://craigslist.org" },
      { name: "Brutalist Websites", url: "https://brutalistwebsites.com" },
    ],
    name: "Brutalist",
    kind: "style",
    tagline: "Raw structure, no apologies.",
    summary:
      "Exposed layout, hard edges, default system type, and high-contrast blocks. Looks built, not decorated — closer to a document than a brochure.",
    traits: [
      "Visible borders and grids",
      "System fonts",
      "High contrast",
      "Unrounded corners",
      "Dense, utilitarian blocks",
    ],
    palette: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Alert", hex: "#ff0000" },
      { name: "Link", hex: "#0000ee" },
    ],
    typography:
      "Times or system sans, default weights, underlined links, minimal styling.",
    tags: ["raw", "high-contrast", "anti-design", "bold"],
  },
  {
    slug: "retro",
    examples: [{ name: "Space Jam (1996)", url: "https://www.spacejam.com/1996/" }],
    name: "Retro",
    kind: "style",
    tagline: "Borrowed warmth from another decade.",
    summary:
      "Period palettes, vintage type, and analog texture. Leans on nostalgia — seventies earth tones, eighties neon, or nineties web naivety.",
    traits: [
      "Period-specific palette",
      "Vintage display type",
      "Grain and texture",
      "Decorative flourishes",
      "Warm, aged tones",
    ],
    palette: [
      { name: "Mustard", hex: "#e3a72f" },
      { name: "Rust", hex: "#b5532a" },
      { name: "Cream", hex: "#f4ead5" },
      { name: "Teal", hex: "#2e6e6a" },
    ],
    typography:
      "Characterful display faces — slab serifs, rounded sans, or script — paired with a plain body.",
    tags: ["nostalgic", "warm", "textured", "playful"],
  },
  {
    slug: "editorial",
    examples: [
      { name: "The New York Times", url: "https://www.nytimes.com" },
      { name: "The Atlantic", url: "https://www.theatlantic.com" },
    ],
    name: "Editorial",
    kind: "style",
    tagline: "Designed to be read.",
    summary:
      "Magazine-grade typography and layout. Strong headlines, measured columns, pull quotes, and a clear reading rhythm carry the experience.",
    traits: [
      "Serif headlines",
      "Measured line length",
      "Pull quotes and drop caps",
      "Strong vertical rhythm",
      "Image-led features",
    ],
    palette: [
      { name: "Newsprint", hex: "#faf7f0" },
      { name: "Ink", hex: "#1a1a1a" },
      { name: "Rule", hex: "#d8d2c4" },
      { name: "Accent", hex: "#a8322d" },
    ],
    typography:
      "A serif for headlines and body (e.g. Tiempos, Lyon), a sans for captions and metadata.",
    tags: ["typographic", "reading", "magazine", "refined"],
  },
  {
    slug: "corporate",
    examples: [
      { name: "IBM", url: "https://www.ibm.com" },
      { name: "Microsoft", url: "https://www.microsoft.com" },
    ],
    name: "Corporate",
    kind: "style",
    tagline: "Trustworthy, predictable, on-brand.",
    summary:
      "Clean, conservative, and consistent. Blue-leaning palettes, rounded cards, and clear CTAs signal stability over surprise.",
    traits: [
      "Conservative palette",
      "Consistent components",
      "Clear calls to action",
      "Rounded cards",
      "Predictable layouts",
    ],
    palette: [
      { name: "Navy", hex: "#1b3a6b" },
      { name: "Sky", hex: "#2e7cd6" },
      { name: "Slate", hex: "#5b6b7b" },
      { name: "Cloud", hex: "#f4f7fb" },
    ],
    typography:
      "A safe, legible sans (e.g. Arial, Open Sans) with a clear heading hierarchy.",
    tags: ["professional", "trust", "safe", "blue"],
  },
  {
    slug: "luxury",
    examples: [
      { name: "Chanel", url: "https://www.chanel.com" },
      { name: "Rolex", url: "https://www.rolex.com" },
    ],
    name: "Luxury",
    kind: "style",
    tagline: "Quiet confidence and space.",
    summary:
      "Restraint signals premium. Deep neutrals, fine serifs, slow motion, and lavish whitespace let a single product or image command attention.",
    traits: [
      "Deep, muted neutrals",
      "Fine serif type",
      "Extreme whitespace",
      "Slow, subtle motion",
      "Large, sparse imagery",
    ],
    palette: [
      { name: "Onyx", hex: "#14110f" },
      { name: "Champagne", hex: "#cdb892" },
      { name: "Bone", hex: "#efe9df" },
      { name: "Gold", hex: "#9c7b3a" },
    ],
    typography:
      "High-contrast serif (e.g. Didot, Canela) with wide letter spacing for headings.",
    tags: ["premium", "elegant", "restrained", "fashion"],
  },
  {
    slug: "playful",
    examples: [
      { name: "Duolingo", url: "https://www.duolingo.com" },
      { name: "Mailchimp", url: "https://mailchimp.com" },
    ],
    name: "Playful",
    kind: "style",
    tagline: "Color, motion, and a wink.",
    summary:
      "Bright palettes, rounded shapes, bouncy motion, and friendly copy. Designed to feel approachable and a little bit fun.",
    traits: [
      "Saturated colors",
      "Rounded shapes",
      "Bouncy micro-interactions",
      "Illustrations and emoji-free icons",
      "Casual copy",
    ],
    palette: [
      { name: "Grape", hex: "#7c3aed" },
      { name: "Sun", hex: "#fbbf24" },
      { name: "Coral", hex: "#fb7185" },
      { name: "Mint", hex: "#34d399" },
    ],
    typography:
      "A rounded sans (e.g. Nunito, Quicksand) with chunky, friendly headings.",
    tags: ["fun", "colorful", "friendly", "rounded"],
  },
  {
    slug: "government",
    examples: [
      { name: "GOV.UK", url: "https://www.gov.uk" },
      { name: "USA.gov", url: "https://www.usa.gov" },
    ],
    name: "Government",
    kind: "style",
    tagline: "Accessible, plain, and for everyone.",
    summary:
      "Public-service design: high accessibility, plain language, obvious controls, and no decoration that could get in the way of a task.",
    traits: [
      "WCAG-first contrast",
      "Plain language",
      "Obvious focus states",
      "Large tap targets",
      "Minimal ornament",
    ],
    palette: [
      { name: "Federal Blue", hex: "#1a4480" },
      { name: "White", hex: "#ffffff" },
      { name: "Ink", hex: "#1b1b1b" },
      { name: "Alert", hex: "#b50909" },
    ],
    typography:
      "A workhorse sans (e.g. Public Sans, Source Sans) tuned for legibility at all sizes.",
    tags: ["accessible", "civic", "plain", "functional"],
  },
  {
    slug: "dashboard",
    examples: [
      { name: "Linear", url: "https://linear.app" },
      { name: "Vercel", url: "https://vercel.com" },
    ],
    name: "Dashboard",
    kind: "style",
    tagline: "Dense signal, fast scanning.",
    summary:
      "Information-dense panels, charts, and tables optimized for monitoring. Color is reserved for status; layout is modular and gridded.",
    traits: [
      "Modular card grid",
      "Status-only color",
      "Charts and sparklines",
      "Compact tables",
      "Persistent navigation",
    ],
    palette: [
      { name: "Panel", hex: "#0f172a" },
      { name: "Surface", hex: "#1e293b" },
      { name: "Good", hex: "#22c55e" },
      { name: "Warn", hex: "#f59e0b" },
    ],
    typography:
      "A compact sans with tabular numerals (e.g. Inter, IBM Plex Sans) for aligned data.",
    tags: ["data", "monitoring", "dense", "ui"],
  },
  {
    slug: "newspaper",
    examples: [
      { name: "The Wall Street Journal", url: "https://www.wsj.com" },
      { name: "The Guardian", url: "https://www.theguardian.com" },
    ],
    name: "Newspaper",
    kind: "style",
    tagline: "The front page, on screen.",
    summary:
      "Multi-column grids, hairline rules, dense headlines, and a clear hierarchy of stories. Built for breadth and scanning, not whitespace.",
    traits: [
      "Multi-column grid",
      "Hairline dividers",
      "Stacked headline hierarchy",
      "High information density",
      "Restrained color",
    ],
    palette: [
      { name: "Stock", hex: "#f6f3ee" },
      { name: "Ink", hex: "#16140f" },
      { name: "Rule", hex: "#cfc8ba" },
      { name: "Link", hex: "#2a5db0" },
    ],
    typography:
      "A serif for headlines and body, a condensed sans for kickers and labels.",
    tags: ["dense", "news", "grid", "typographic"],
  },
  {
    slug: "magazine",
    examples: [
      { name: "Wired", url: "https://www.wired.com" },
      { name: "Vogue", url: "https://www.vogue.com" },
    ],
    name: "Magazine",
    kind: "style",
    tagline: "Art-directed and expressive.",
    summary:
      "Each spread feels designed. Bold covers, varied layouts, dramatic imagery, and typographic contrast carry a strong editorial voice.",
    traits: [
      "Art-directed layouts",
      "Dramatic imagery",
      "Typographic contrast",
      "Full-bleed sections",
      "Expressive covers",
    ],
    palette: [
      { name: "Paper", hex: "#fffdf8" },
      { name: "Ink", hex: "#101010" },
      { name: "Hot", hex: "#ff2e63" },
      { name: "Cobalt", hex: "#1d4ed8" },
    ],
    typography:
      "Big expressive display faces against a quiet body; mix weights and sizes boldly.",
    tags: ["expressive", "editorial", "bold", "imagery"],
  },
  {
    slug: "data-dense",
    examples: [
      { name: "Bloomberg", url: "https://www.bloomberg.com" },
      { name: "GitHub", url: "https://github.com" },
    ],
    name: "Data Dense",
    kind: "style",
    tagline: "Maximum information per pixel.",
    summary:
      "Spreadsheet energy: small type, tight rows, and minimal chrome to fit as much as possible on screen. Built for professionals who read fast.",
    traits: [
      "Small type sizes",
      "Tight row height",
      "Minimal padding",
      "Tabular numerals",
      "Inline controls",
    ],
    palette: [
      { name: "Grid", hex: "#fbfbfa" },
      { name: "Ink", hex: "#1f2328" },
      { name: "Line", hex: "#e1e4e8" },
      { name: "Accent", hex: "#0969da" },
    ],
    typography:
      "A compact sans or mono at small sizes with strong tabular figures for alignment.",
    tags: ["dense", "tables", "pro", "terminal"],
  },
  {
    slug: "apple-inspired",
    examples: [{ name: "Apple", url: "https://www.apple.com" }],
    name: "Apple Inspired",
    kind: "style",
    tagline: "Product as hero, space as luxury.",
    summary:
      "Centered hero shots, huge type, deep blacks, and choreographed scroll. Marketing pages feel cinematic; UI feels effortless and quiet.",
    traits: [
      "Oversized headings",
      "Centered product imagery",
      "Generous whitespace",
      "Scroll-driven reveals",
      "Subtle depth and blur",
    ],
    palette: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Graphite", hex: "#86868b" },
      { name: "Link", hex: "#0066cc" },
    ],
    typography:
      "A clean geometric/neutral sans (San Francisco / Inter) with very large, tight headings.",
    tags: ["premium", "marketing", "spacious", "cinematic"],
  },
  {
    slug: "material-design",
    examples: [
      { name: "Material Design 3", url: "https://m3.material.io" },
      { name: "Google", url: "https://www.google.com" },
    ],
    name: "Material Design",
    kind: "style",
    tagline: "Paper, ink, and elevation.",
    summary:
      "Google's system: surfaces with shadow elevation, bold color roles, ripple feedback, and a consistent component library across platforms.",
    traits: [
      "Elevation shadows",
      "Bold primary color",
      "Ripple feedback",
      "Floating action buttons",
      "Consistent components",
    ],
    palette: [
      { name: "Primary", hex: "#6750a4" },
      { name: "Surface", hex: "#fffbfe" },
      { name: "Secondary", hex: "#625b71" },
      { name: "Error", hex: "#b3261e" },
    ],
    typography:
      "Roboto (or a neutral sans) with a defined type scale of named roles.",
    tags: ["system", "google", "components", "android"],
  },
  {
    slug: "skeuomorphic",
    name: "Skeuomorphic",
    kind: "style",
    tagline: "Pixels that mimic the real world.",
    summary:
      "Textures, gradients, bevels, and shadows that imitate physical materials — leather, glass, metal. Rich and tactile, the opposite of flat.",
    traits: [
      "Material textures",
      "Gradients and bevels",
      "Drop shadows",
      "Realistic controls",
      "Tactile depth",
    ],
    palette: [
      { name: "Leather", hex: "#5b3a22" },
      { name: "Felt", hex: "#1f6b3a" },
      { name: "Metal", hex: "#b8bcc2" },
      { name: "Glass", hex: "#cfe8ff" },
    ],
    typography:
      "Engraved or embossed text effects over textured surfaces; classic humanist sans.",
    tags: ["tactile", "realistic", "textured", "vintage-ui"],
  },
  {
    slug: "neo-brutalist",
    examples: [{ name: "Gumroad", url: "https://gumroad.com" }],
    name: "Neo Brutalist",
    kind: "style",
    tagline: "Brutalism with a designer's eye.",
    summary:
      "The raw energy of brutalism, art-directed: thick black borders, hard offset shadows, clashing saturated blocks, and confident display type.",
    traits: [
      "Thick black outlines",
      "Hard offset shadows",
      "Clashing saturated blocks",
      "Sticker-like elements",
      "Bold display type",
    ],
    palette: [
      { name: "Black", hex: "#111111" },
      { name: "Lime", hex: "#c6f400" },
      { name: "Pink", hex: "#ff90e8" },
      { name: "Blue", hex: "#2b7fff" },
    ],
    typography:
      "Heavy grotesk display type, all-caps labels, monospace accents.",
    tags: ["bold", "trendy", "high-contrast", "graphic"],
  },
  {
    slug: "swiss",
    examples: [{ name: "Swissted", url: "https://www.swissted.com" }],
    name: "Swiss",
    kind: "style",
    tagline: "Grid, type, objectivity.",
    summary:
      "International Typographic Style: rigorous grids, flush-left sans-serif type, asymmetric balance, and content over decoration.",
    traits: [
      "Strict grid systems",
      "Flush-left, ragged-right text",
      "Neutral sans-serif",
      "Asymmetric balance",
      "Objective, no ornament",
    ],
    palette: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Red", hex: "#e3000f" },
      { name: "Gray", hex: "#9b9b9b" },
    ],
    typography:
      "Helvetica or Akzidenz-Grotesk on a tight grid, with clear size steps.",
    tags: ["grid", "typographic", "objective", "classic"],
  },
  {
    slug: "modern-saas",
    examples: [
      { name: "Stripe", url: "https://stripe.com" },
      { name: "Linear", url: "https://linear.app" },
      { name: "Vercel", url: "https://vercel.com" },
    ],
    name: "Modern SaaS",
    kind: "style",
    tagline: "The default of the well-funded startup.",
    summary:
      "Gradient hero, soft shadows, rounded cards, friendly sans, and a feature grid. Polished, conversion-minded, and instantly familiar.",
    traits: [
      "Gradient hero sections",
      "Soft shadows and rounded cards",
      "Feature grids",
      "Logo clouds and testimonials",
      "Gentle micro-interactions",
    ],
    palette: [
      { name: "Indigo", hex: "#6366f1" },
      { name: "Violet", hex: "#8b5cf6" },
      { name: "Ink", hex: "#0f172a" },
      { name: "Cloud", hex: "#f8fafc" },
    ],
    typography:
      "A friendly geometric sans (Inter, Geist) with large headings and comfortable body.",
    tags: ["startup", "marketing", "gradient", "polished"],
  },
  {
    slug: "terminal-hacker",
    name: "Terminal / Hacker",
    kind: "style",
    tagline: "Monospace, mono-color, no nonsense.",
    summary:
      "Command-line aesthetics: dark background, monospace type, phosphor-green or amber text, blinking cursors, and ASCII flourishes.",
    traits: [
      "Monospace everywhere",
      "Dark background",
      "Single phosphor accent",
      "Blinking cursor",
      "ASCII and box-drawing",
    ],
    palette: [
      { name: "Void", hex: "#0b0f0b" },
      { name: "Phosphor", hex: "#33ff66" },
      { name: "Amber", hex: "#ffb000" },
      { name: "Dim", hex: "#1f2a1f" },
    ],
    typography:
      "A monospace face (JetBrains Mono, IBM Plex Mono) at a single size with a strong baseline grid.",
    tags: ["mono", "dark", "developer", "retro-tech"],
  },
  {
    slug: "cyberpunk",
    examples: [{ name: "Cyberpunk 2077", url: "https://www.cyberpunk.net" }],
    name: "Cyberpunk",
    kind: "style",
    tagline: "Neon, glitch, and chrome.",
    summary:
      "High-tech low-life: neon on near-black, glitch effects, scanlines, and chromatic aberration. Loud, futuristic, and unmistakably digital.",
    traits: [
      "Neon on near-black",
      "Glitch and scanlines",
      "Chromatic aberration",
      "Glowing edges",
      "Futuristic display type",
    ],
    palette: [
      { name: "Night", hex: "#0a0014" },
      { name: "Cyan", hex: "#00e5ff" },
      { name: "Magenta", hex: "#ff00a0" },
      { name: "Yellow", hex: "#f9f002" },
    ],
    typography:
      "Wide techno display faces with glow, paired with a clean mono for body.",
    tags: ["neon", "futuristic", "dark", "gaming"],
  },
];
