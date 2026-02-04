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
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
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
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
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
