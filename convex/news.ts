import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const news = await ctx.db
      .query("news")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return news.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const listPublic = query({
  handler: async (ctx) => {
    const news = await ctx.db
      .query("news")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return news.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const listAll = query({
  handler: async (ctx) => {
    const news = await ctx.db.query("news").collect();
    return news.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    isImportant: v.boolean(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("news", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("news"),
    title: v.string(),
    content: v.string(),
    isImportant: v.boolean(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("news"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
