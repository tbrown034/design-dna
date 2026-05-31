import { relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

// Curated library entries are static TS (data/library), not DB rows. User
// saves reference them by `librarySlug` (validated against the seed on write).
export const libraryKind = pgEnum("library_kind", ["style", "influence"]);
export const mixMode = pgEnum("mix_mode", ["weighted", "additive"]);
export const patternElement = pgEnum("pattern_element", [
  "header",
  "nav",
  "typography",
  "buttons",
  "cards",
  "tables",
  "search",
  "forms",
  "layout",
  "color_palette",
  "information_density",
]);
export const patternSourceType = pgEnum("pattern_source_type", [
  "saved_item",
  "url_analysis",
  "library",
]);
export const generationStatus = pgEnum("generation_status", [
  "pending",
  "streaming",
  "complete",
  "failed",
]);
export const promptTool = pgEnum("prompt_tool", [
  "claude",
  "chatgpt",
  "cursor",
  "v0",
  "generic",
]);
export const moodItemType = pgEnum("mood_item_type", ["image", "url", "note"]);
export const analysisStatus = pgEnum("analysis_status", [
  "pending",
  "processing",
  "complete",
  "failed",
]);

// ---------------------------------------------------------------------------
// Library saves
// ---------------------------------------------------------------------------

export const savedItems = pgTable(
  "saved_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    librarySlug: text("library_slug").notNull(),
    kind: libraryKind("kind").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("saved_items_user_slug_uniq").on(t.userId, t.librarySlug),
    index("saved_items_user_idx").on(t.userId),
  ],
);

// ---------------------------------------------------------------------------
// Mix & Match
// ---------------------------------------------------------------------------

export const mixes = pgTable(
  "mixes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    mode: mixMode("mode").notNull().default("weighted"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("mixes_user_idx").on(t.userId)],
);

export const mixComponents = pgTable(
  "mix_components",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mixId: uuid("mix_id")
      .notNull()
      .references(() => mixes.id, { onDelete: "cascade" }),
    librarySlug: text("library_slug").notNull(),
    // 0-100 for weighted mode; null for additive mode.
    weight: integer("weight"),
    // Optional pattern focus, e.g. "FT typography + Apple spacing".
    patternFocus: patternElement("pattern_focus"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("mix_components_mix_idx").on(t.mixId)],
);

// ---------------------------------------------------------------------------
// Pattern Extraction
// ---------------------------------------------------------------------------

export const patternExtractions = pgTable(
  "pattern_extractions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    sourceType: patternSourceType("source_type").notNull(),
    // Points to a savedItems.id, urlAnalyses.id, or a library slug.
    sourceId: text("source_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("pattern_extractions_user_idx").on(t.userId)],
);

export const patternTags = pgTable(
  "pattern_tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    extractionId: uuid("extraction_id")
      .notNull()
      .references(() => patternExtractions.id, { onDelete: "cascade" }),
    element: patternElement("element").notNull(),
    note: text("note"),
  },
  (t) => [index("pattern_tags_extraction_idx").on(t.extractionId)],
);

// ---------------------------------------------------------------------------
// Design DNA Profile + Prompts
// ---------------------------------------------------------------------------

export const dnaProfiles = pgTable(
  "dna_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    // A profile can outlive the mix it was generated from.
    mixId: uuid("mix_id").references(() => mixes.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    status: generationStatus("status").notNull().default("pending"),
    // { visualStyle, interactionPhilosophy, hierarchy, tone, ... }
    profile: jsonb("profile"),
    model: text("model"),
    inputTokens: integer("input_tokens"),
    outputTokens: integer("output_tokens"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("dna_profiles_user_idx").on(t.userId)],
);

export const generatedPrompts = pgTable(
  "generated_prompts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    dnaProfileId: uuid("dna_profile_id")
      .notNull()
      .references(() => dnaProfiles.id, { onDelete: "cascade" }),
    tool: promptTool("tool").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("generated_prompts_profile_idx").on(t.dnaProfileId)],
);

// ---------------------------------------------------------------------------
// Mood Board
// ---------------------------------------------------------------------------

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("projects_user_idx").on(t.userId)],
);

export const moodboardItems = pgTable(
  "moodboard_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: moodItemType("type").notNull(),
    blobUrl: text("blob_url"),
    blobPathname: text("blob_pathname"),
    sourceUrl: text("source_url"),
    note: text("note"),
    width: integer("width"),
    height: integer("height"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("moodboard_items_project_idx").on(t.projectId, t.sortOrder)],
);

// ---------------------------------------------------------------------------
// Live URL Design Analysis
// ---------------------------------------------------------------------------

export const urlAnalyses = pgTable(
  "url_analyses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    normalizedUrl: text("normalized_url").notNull(),
    status: analysisStatus("status").notNull().default("pending"),
    screenshotBlobUrl: text("screenshot_blob_url"),
    // { typography, spacing, color, navigation, density, hierarchy, interaction }
    analysis: jsonb("analysis"),
    errorMessage: text("error_message"),
    model: text("model"),
    inputTokens: integer("input_tokens"),
    outputTokens: integer("output_tokens"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
  },
  (t) => [
    index("url_analyses_user_idx").on(t.userId, t.createdAt),
    index("url_analyses_normalized_idx").on(t.normalizedUrl),
  ],
);

// ---------------------------------------------------------------------------
// Personal Taste Profile (derived; one current row per user)
// ---------------------------------------------------------------------------

export const tasteProfiles = pgTable(
  "taste_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    summary: jsonb("summary"),
    evidenceSnapshot: jsonb("evidence_snapshot"),
    generatedAt: timestamp("generated_at").defaultNow().notNull(),
  },
);

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const userRelations = relations(user, ({ many, one }) => ({
  savedItems: many(savedItems),
  mixes: many(mixes),
  dnaProfiles: many(dnaProfiles),
  projects: many(projects),
  urlAnalyses: many(urlAnalyses),
  patternExtractions: many(patternExtractions),
  tasteProfile: one(tasteProfiles),
}));

export const savedItemsRelations = relations(savedItems, ({ one }) => ({
  user: one(user, { fields: [savedItems.userId], references: [user.id] }),
}));

export const mixesRelations = relations(mixes, ({ one, many }) => ({
  user: one(user, { fields: [mixes.userId], references: [user.id] }),
  components: many(mixComponents),
  dnaProfiles: many(dnaProfiles),
}));

export const mixComponentsRelations = relations(mixComponents, ({ one }) => ({
  mix: one(mixes, { fields: [mixComponents.mixId], references: [mixes.id] }),
}));

export const patternExtractionsRelations = relations(
  patternExtractions,
  ({ one, many }) => ({
    user: one(user, {
      fields: [patternExtractions.userId],
      references: [user.id],
    }),
    tags: many(patternTags),
  }),
);

export const patternTagsRelations = relations(patternTags, ({ one }) => ({
  extraction: one(patternExtractions, {
    fields: [patternTags.extractionId],
    references: [patternExtractions.id],
  }),
}));

export const dnaProfilesRelations = relations(dnaProfiles, ({ one, many }) => ({
  user: one(user, { fields: [dnaProfiles.userId], references: [user.id] }),
  mix: one(mixes, { fields: [dnaProfiles.mixId], references: [mixes.id] }),
  prompts: many(generatedPrompts),
}));

export const generatedPromptsRelations = relations(
  generatedPrompts,
  ({ one }) => ({
    profile: one(dnaProfiles, {
      fields: [generatedPrompts.dnaProfileId],
      references: [dnaProfiles.id],
    }),
  }),
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(user, { fields: [projects.userId], references: [user.id] }),
  items: many(moodboardItems),
}));

export const moodboardItemsRelations = relations(moodboardItems, ({ one }) => ({
  project: one(projects, {
    fields: [moodboardItems.projectId],
    references: [projects.id],
  }),
}));

export const urlAnalysesRelations = relations(urlAnalyses, ({ one }) => ({
  user: one(user, { fields: [urlAnalyses.userId], references: [user.id] }),
}));
