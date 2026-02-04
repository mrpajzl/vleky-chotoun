import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCurrent = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("operatingStatus").collect();
    if (all.length === 0) return null;
    return all.sort((a, b) => b.lastUpdated - a.lastUpdated)[0];
  },
});

export const get = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("operatingStatus").collect();
    if (all.length === 0) return null;
    return all.sort((a, b) => b.lastUpdated - a.lastUpdated)[0];
  },
});

export const update = mutation({
  args: {
    isOpen: v.boolean(),
    openingHours: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("operatingStatus").first();
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastUpdated: Date.now(),
      });
      return existing._id;
    } else {
      return await ctx.db.insert("operatingStatus", {
        ...args,
        lastUpdated: Date.now(),
      });
    }
  },
});
