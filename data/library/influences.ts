import type { LibraryEntry } from "./types";

// Twenty-six specific brand/product influences. Traits describe
// widely-recognized design characteristics; palettes are representative
// references, not exact brand specifications.
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
  {
    slug: "figma",
    name: "Figma",
    kind: "influence",
    tagline: "Multiplayer canvas, multicolor mark.",
    summary:
      "Figma wraps a neutral, low-chrome tool UI around an infinite canvas, with a playful multicolor logo and live multiplayer cursors. Serious craft with a friendly, collaborative streak.",
    traits: [
      "Infinite canvas surface",
      "Multiplayer cursors and presence",
      "Multicolor geometric logo",
      "Neutral, low-chrome tool UI",
      "Playful FigJam energy",
    ],
    palette: [
      { name: "Red", hex: "#f24e1e" },
      { name: "Purple", hex: "#a259ff" },
      { name: "Blue", hex: "#1abcfe" },
      { name: "Green", hex: "#0acf83" },
    ],
    typography:
      "A clean neutral sans for the UI; the brand leans on color and shape over type.",
    tags: ["design-tool", "colorful", "collaborative", "canvas", "playful"],
    url: "https://www.figma.com",
  },
  {
    slug: "spotify",
    name: "Spotify",
    kind: "influence",
    tagline: "Sound in vivid green.",
    summary:
      "A near-black canvas lets album art and duotone photography glow, anchored by one unmistakable green. Bold circular type and gradient-washed playlists give it a confident, music-first energy.",
    traits: [
      "Near-black canvas",
      "Vivid signature green",
      "Duotone photography",
      "Bold circular sans",
      "Gradient playlist art",
    ],
    palette: [
      { name: "Spotify Green", hex: "#1ed760" },
      { name: "Black", hex: "#121212" },
      { name: "White", hex: "#ffffff" },
      { name: "Gray", hex: "#b3b3b3" },
    ],
    typography:
      "Spotify Circular — a geometric sans, heavy and confident for headings.",
    tags: ["music", "dark", "bold", "vivid", "media"],
    url: "https://www.spotify.com",
  },
  {
    slug: "duolingo",
    name: "Duolingo",
    kind: "influence",
    tagline: "Gamified, rounded, relentlessly friendly.",
    summary:
      "Bright green, a chunky rounded display face, and a cast of expressive mascots turn language drills into a game. Big 3D push-buttons, celebratory animation, and instant feedback keep it moving.",
    traits: [
      "Bright friendly green",
      "Chunky rounded display type",
      "Mascot-driven personality",
      "3D push-button controls",
      "Celebratory micro-animation",
    ],
    palette: [
      { name: "Feather Green", hex: "#58cc02" },
      { name: "Eel", hex: "#4b4b4b" },
      { name: "Snow", hex: "#ffffff" },
      { name: "Macaw", hex: "#1cb0f6" },
    ],
    typography:
      "Feather Bold (a rounded din) for display; a clean sans for body.",
    tags: ["gamified", "playful", "rounded", "mascot", "education"],
    url: "https://www.duolingo.com",
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    kind: "influence",
    tagline: "Quirky, illustrated, unmistakably yellow.",
    summary:
      "Cavendish yellow, near-black ink, and a Cooper-style serif give Mailchimp a warm, off-kilter editorial voice. Hand-drawn illustration and a sense of humor keep a marketing tool feeling human.",
    traits: [
      "Cavendish yellow and black",
      "Cooper-style serif display",
      "Hand-drawn illustration",
      "Warm, off-kilter editorial",
      "Playful, human tone",
    ],
    palette: [
      { name: "Cavendish Yellow", hex: "#ffe01b" },
      { name: "Ink", hex: "#241c15" },
      { name: "Peppercorn", hex: "#3c3c3c" },
      { name: "White", hex: "#ffffff" },
    ],
    typography:
      "Cooper Light (serif) for display, a clean grotesque for UI and body.",
    tags: ["marketing", "editorial", "illustrated", "warm", "quirky"],
    url: "https://www.mailchimp.com",
  },
  {
    slug: "discord",
    name: "Discord",
    kind: "influence",
    tagline: "Blurple, rounded, built for hanging out.",
    summary:
      "Discord's blurple accent, rounded everything, and friendly illustration make a power-user chat app feel casual and welcoming. Solid dark and light themes with chunky, approachable controls.",
    traits: [
      "Blurple signature accent",
      "Rounded, friendly UI",
      "Robust dark and light themes",
      "Playful illustration",
      "Chunky, approachable controls",
    ],
    palette: [
      { name: "Blurple", hex: "#5865f2" },
      { name: "Dark", hex: "#313338" },
      { name: "White", hex: "#ffffff" },
      { name: "Green", hex: "#23a55a" },
    ],
    typography: "gg sans — a rounded, friendly sans across UI and headings.",
    tags: ["chat", "playful", "rounded", "community", "dark"],
    url: "https://discord.com",
  },
  {
    slug: "aesop",
    name: "Aesop",
    kind: "influence",
    tagline: "Apothecary restraint.",
    summary:
      "A calm, cream-toned canvas, generous margins, and quietly classical type give Aesop its understated luxury. Product-forward and editorial, with almost no color and a lot of confidence.",
    traits: [
      "Cream, paper-warm palette",
      "Generous margins and whitespace",
      "Quiet classical typography",
      "Product-forward restraint",
      "Editorial, unhurried pacing",
    ],
    palette: [
      { name: "Cream", hex: "#efebe2" },
      { name: "Ink", hex: "#33312e" },
      { name: "Stone", hex: "#a8a195" },
      { name: "Olive", hex: "#5b5a3f" },
    ],
    typography:
      "A restrained grotesque paired with a classical serif for editorial moments.",
    tags: ["luxury", "minimal", "editorial", "warm", "restrained"],
    url: "https://www.aesop.com",
  },
  {
    slug: "teenage-engineering",
    name: "Teenage Engineering",
    kind: "influence",
    tagline: "Industrial, Swiss, playfully technical.",
    summary:
      "Stark white space, a strict grid, and a neutral grotesque used like a control panel — labels, numbers, primary-color accents. Utilitarian hardware design language brought to the screen.",
    traits: [
      "Stark white, strict grid",
      "Neutral grotesque, used technically",
      "Primary-color signal accents",
      "Labeled, numbered, diagrammatic",
      "Product-photography forward",
    ],
    palette: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
      { name: "Signal Red", hex: "#ff0000" },
      { name: "Yellow", hex: "#ffd500" },
    ],
    typography:
      "A Helvetica-like grotesque set tightly and technically, like instrument labels.",
    tags: ["industrial", "swiss", "technical", "minimal", "hardware"],
    url: "https://teenage.engineering",
  },
  {
    slug: "nothing",
    name: "Nothing",
    kind: "influence",
    tagline: "Dot-matrix monochrome.",
    summary:
      "Pure black and white, a dot-matrix display face, and glyph and LED motifs give Nothing its transparent, industrial-tech identity. Minimal to the point of severity, with a single red dot for warmth.",
    traits: [
      "Pure black-and-white base",
      "Dot-matrix display type",
      "Glyph and LED motifs",
      "Transparency and exposed parts",
      "Severe, industrial minimalism",
    ],
    palette: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Gray", hex: "#999999" },
      { name: "Dot Red", hex: "#d71921" },
    ],
    typography:
      "Ndot (a dot-matrix face) for display; a plain grotesque for body.",
    tags: ["tech", "monochrome", "industrial", "minimal", "dot-matrix"],
    url: "https://nothing.tech",
  },
  {
    slug: "slack",
    name: "Slack",
    kind: "influence",
    tagline: "Aubergine and a colorful pinwheel.",
    summary:
      "A deep aubergine anchored by a four-color pinwheel mark, with rounded, friendly UI and clear messaging hierarchy. Approachable and organized — work software that doesn't feel like it.",
    traits: [
      "Deep aubergine base",
      "Four-color pinwheel accents",
      "Rounded, friendly UI",
      "Clear messaging hierarchy",
      "Organized, approachable tone",
    ],
    palette: [
      { name: "Aubergine", hex: "#4a154b" },
      { name: "Blue", hex: "#36c5f0" },
      { name: "Green", hex: "#2eb67d" },
      { name: "Red", hex: "#e01e5a" },
    ],
    typography:
      "A friendly humanist sans (Hellix / Lato) with comfortable spacing.",
    tags: ["productivity", "chat", "friendly", "rounded", "system"],
    url: "https://slack.com",
  },
  {
    slug: "canva",
    name: "Canva",
    kind: "influence",
    tagline: "Approachable gradient creativity.",
    summary:
      "A purple-to-cyan gradient, rounded friendly UI, and a wall of colorful templates make design feel possible for anyone. Accessible and warm, optimized for confidence over craft anxiety.",
    traits: [
      "Purple-to-cyan gradient",
      "Rounded, friendly UI",
      "Colorful template grids",
      "Accessible, beginner-first",
      "Warm, encouraging tone",
    ],
    palette: [
      { name: "Canva Purple", hex: "#8b3dff" },
      { name: "Cyan", hex: "#00c4cc" },
      { name: "Ink", hex: "#0e1318" },
      { name: "White", hex: "#ffffff" },
    ],
    typography:
      "Canva Sans — a friendly geometric sans with rounded, open forms.",
    tags: ["design-tool", "gradient", "friendly", "colorful", "accessible"],
    url: "https://www.canva.com",
  },
];
