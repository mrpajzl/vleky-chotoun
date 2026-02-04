import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const lifts = await ctx.db.query("lifts").collect();
    return lifts.sort((a, b) => a.order - b.order);
  },
});

export const update = mutation({
  args: {
    id: v.id("lifts"),
    isOperating: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const updateFull = mutation({
  args: {
    id: v.id("lifts"),
    name: v.string(),
    isOperating: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("lifts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    isOperating: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lifts", args);
  },
});
