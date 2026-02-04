import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Webcams
  cameras: defineTable({
    name_cs: v.optional(v.string()),
    name_en: v.optional(v.string()),
    description_cs: v.optional(v.string()),
    description_en: v.optional(v.string()),
    imageUrl: v.string(), // URL for static image or iframe embed
    type: v.optional(v.union(v.literal("image"), v.literal("iframe"))), // defaults to "image" for backward compatibility
    cameraName: v.optional(v.string()), // e.g. "w1", "w2", "w3" for history URLs
    historyCount: v.optional(v.number()), // Number of historical images (default 216)
    order: v.number(),
    isActive: v.boolean(),
    // Deprecated single-language fields (kept for migration)
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  }),

  // Operating status
  operatingStatus: defineTable({
    isOpen: v.boolean(),
    openingHours: v.string(),
    lastUpdated: v.number(),
    updatedBy: v.optional(v.string()),
  }),

  // Lift status
  lifts: defineTable({
    name_cs: v.optional(v.string()),
    name_en: v.optional(v.string()),
    isOperating: v.boolean(),
    order: v.number(),
    // Deprecated
    name: v.optional(v.string()),
  }),

  // Weather & Conditions
  conditions: defineTable({
    snowDepth: v.string(),
    snowType: v.string(),
    quality: v.string(),
    temperature: v.optional(v.string()), // Deprecated, kept for backward compatibility
    lastUpdated: v.number(),
    updatedBy: v.optional(v.string()),
  }),

  // Pricing
  pricing: defineTable({
    category: v.string(), // "time" or "points" or "kids"
    name_cs: v.optional(v.string()),
    name_en: v.optional(v.string()),
    priceRegular: v.number(),
    priceReduced: v.optional(v.number()),
    description_cs: v.optional(v.string()),
    description_en: v.optional(v.string()),
    order: v.number(),
    // Deprecated
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  }),

  // News/Announcements
  news: defineTable({
    title_cs: v.optional(v.string()),
    title_en: v.optional(v.string()),
    content_cs: v.optional(v.string()),
    content_en: v.optional(v.string()),
    isImportant: v.boolean(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    // Deprecated
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  }),

  // Settings
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  // Admin users (simple auth)
  admins: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    createdAt: v.number(),
  }).index("by_username", ["username"]),
});
