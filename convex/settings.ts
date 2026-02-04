import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {
    key: v.string(),
  },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return setting?.value ?? null;
  },
});

export const getLocation = query({
  handler: async (ctx) => {
    const lat = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "location_lat"))
      .first();
    
    const lon = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "location_lon"))
      .first();

    return {
      lat: lat?.value ? parseFloat(lat.value) : 49.90122, // Default: Chotouň
      lon: lon?.value ? parseFloat(lon.value) : 14.51319,
    };
  },
});

export const set = mutation({
  args: {
    key: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
      return existing._id;
    } else {
      return await ctx.db.insert("settings", args);
    }
  },
});

export const setLocation = mutation({
  args: {
    lat: v.number(),
    lon: v.number(),
  },
  handler: async (ctx, args) => {
    // Save latitude
    const latSetting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "location_lat"))
      .first();
    
    if (latSetting) {
      await ctx.db.patch(latSetting._id, { value: args.lat.toString() });
    } else {
      await ctx.db.insert("settings", { key: "location_lat", value: args.lat.toString() });
    }

    // Save longitude
    const lonSetting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "location_lon"))
      .first();
    
    if (lonSetting) {
      await ctx.db.patch(lonSetting._id, { value: args.lon.toString() });
    } else {
      await ctx.db.insert("settings", { key: "location_lon", value: args.lon.toString() });
    }
  },
});
