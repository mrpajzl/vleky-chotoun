import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const cameras = await ctx.db
      .query("cameras")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return cameras.sort((a, b) => a.order - b.order);
  },
});

export const listAll = query({
  handler: async (ctx) => {
    const cameras = await ctx.db.query("cameras").collect();
    return cameras.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: {
    name_cs: v.optional(v.string()),
    name_en: v.optional(v.string()),
    description_cs: v.optional(v.string()),
    description_en: v.optional(v.string()),
    imageUrl: v.string(),
    type: v.optional(v.union(v.literal("image"), v.literal("iframe"))),
    order: v.number(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cameras", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("cameras"),
    name_cs: v.optional(v.string()),
    name_en: v.optional(v.string()),
    description_cs: v.optional(v.string()),
    description_en: v.optional(v.string()),
    imageUrl: v.string(),
    type: v.optional(v.union(v.literal("image"), v.literal("iframe"))),
    order: v.number(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("cameras"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
