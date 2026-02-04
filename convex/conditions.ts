import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCurrent = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("conditions").collect();
    if (all.length === 0) return null;
    return all.sort((a, b) => b.lastUpdated - a.lastUpdated)[0];
  },
});

export const get = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("conditions").collect();
    if (all.length === 0) return null;
    return all.sort((a, b) => b.lastUpdated - a.lastUpdated)[0];
  },
});

export const update = mutation({
  args: {
    snowDepth: v.string(),
    snowType: v.string(),
    quality: v.string(),
    temperature: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("conditions").first();
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastUpdated: Date.now(),
      });
      return existing._id;
    } else {
      return await ctx.db.insert("conditions", {
        ...args,
        lastUpdated: Date.now(),
      });
    }
  },
});
