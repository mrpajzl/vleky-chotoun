import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Webcams
  cameras: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    order: v.number(),
    isActive: v.boolean(),
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
    name: v.string(),
    isOperating: v.boolean(),
    order: v.number(),
  }),

  // Weather & Conditions
  conditions: defineTable({
    snowDepth: v.string(),
    snowType: v.string(),
    quality: v.string(),
    temperature: v.optional(v.string()),
    lastUpdated: v.number(),
    updatedBy: v.optional(v.string()),
  }),

  // Pricing
  pricing: defineTable({
    category: v.string(), // "time" or "points" or "kids"
    name: v.string(),
    priceRegular: v.number(),
    priceReduced: v.optional(v.number()),
    description: v.optional(v.string()),
    order: v.number(),
  }),

  // News/Announcements
  news: defineTable({
    title: v.string(),
    content: v.string(),
    isImportant: v.boolean(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
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
