import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const pricing = await ctx.db.query("pricing").collect();
    return pricing.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: {
    category: v.string(),
    name: v.string(),
    priceRegular: v.number(),
    priceReduced: v.optional(v.number()),
    description: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pricing", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("pricing"),
    category: v.string(),
    name: v.string(),
    priceRegular: v.number(),
    priceReduced: v.optional(v.number()),
    description: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("pricing"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
