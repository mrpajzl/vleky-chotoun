import { mutation } from "./_generated/server";

// One-time migration to populate bilingual fields from existing data
export const runMigration = mutation({
  handler: async (ctx) => {
    console.log("Starting bilingual migration...");
    
    // Migrate cameras
    const cameras = await ctx.db.query("cameras").collect();
    for (const camera of cameras) {
      if (!camera.name_cs && camera.name) {
        await ctx.db.patch(camera._id, {
          name_cs: camera.name,
          name_en: camera.name, // Copy for now, translate manually later
          description_cs: camera.description || "",
          description_en: camera.description || "",
        });
      }
    }
    console.log(`Migrated ${cameras.length} cameras`);
    
    // Migrate lifts
    const lifts = await ctx.db.query("lifts").collect();
    for (const lift of lifts) {
      if (!lift.name_cs && lift.name) {
        await ctx.db.patch(lift._id, {
          name_cs: lift.name,
          name_en: lift.name,
        });
      }
    }
    console.log(`Migrated ${lifts.length} lifts`);
    
    // Migrate pricing
    const pricing = await ctx.db.query("pricing").collect();
    for (const item of pricing) {
      if (!item.name_cs && item.name) {
        await ctx.db.patch(item._id, {
          name_cs: item.name,
          name_en: item.name,
          description_cs: item.description || "",
          description_en: item.description || "",
        });
      }
    }
    console.log(`Migrated ${pricing.length} pricing items`);
    
    // Migrate news
    const news = await ctx.db.query("news").collect();
    for (const item of news) {
      if (!item.title_cs && item.title) {
        await ctx.db.patch(item._id, {
          title_cs: item.title,
          title_en: item.title,
          content_cs: item.content,
          content_en: item.content,
        });
      }
    }
    console.log(`Migrated ${news.length} news items`);
    
    return {
      cameras: cameras.length,
      lifts: lifts.length,
      pricing: pricing.length,
      news: news.length,
    };
  },
});
