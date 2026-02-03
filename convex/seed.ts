import { mutation } from "./_generated/server";

export const seedData = mutation({
  handler: async (ctx) => {
    // Check if data already exists
    const existingCameras = await ctx.db.query("cameras").first();
    if (existingCameras) {
      return { message: "Data already seeded" };
    }

    // Seed cameras
    await ctx.db.insert("cameras", {
      name: "Kamera 1",
      description: "Hlavní pohled na sjezdovku",
      imageUrl: "https://www.vlekychotoun.cz/camera/w1-0.jpg",
      order: 1,
      isActive: true,
    });

    await ctx.db.insert("cameras", {
      name: "Kamera 2",
      description: "Pohled na druhý vlek",
      imageUrl: "https://www.vlekychotoun.cz/camera/w2-0.jpg",
      order: 2,
      isActive: true,
    });

    await ctx.db.insert("cameras", {
      name: "Kamera 3",
      description: "Celkový pohled na areál",
      imageUrl: "https://www.vlekychotoun.cz/camera/w3-0.jpg",
      order: 3,
      isActive: true,
    });

    // Seed operating status
    await ctx.db.insert("operatingStatus", {
      isOpen: true,
      openingHours: "9-21 (so+ne 8-21)",
      lastUpdated: Date.now(),
    });

    // Seed lifts
    await ctx.db.insert("lifts", {
      name: "Poma 1",
      isOperating: true,
      order: 1,
    });

    await ctx.db.insert("lifts", {
      name: "Poma 2",
      isOperating: true,
      order: 2,
    });

    await ctx.db.insert("lifts", {
      name: "Dětský lyžařský areál",
      isOperating: true,
      order: 3,
    });

    // Seed conditions
    await ctx.db.insert("conditions", {
      snowDepth: "100-140cm",
      snowType: "technický+přírodní",
      quality: "výborné",
      lastUpdated: Date.now(),
    });

    // Seed pricing - Time tickets
    await ctx.db.insert("pricing", {
      category: "time",
      name: "1 hodina",
      priceRegular: 260,
      priceReduced: 230,
      order: 1,
    });

    await ctx.db.insert("pricing", {
      category: "time",
      name: "2 hodiny",
      priceRegular: 350,
      priceReduced: 300,
      order: 2,
    });

    await ctx.db.insert("pricing", {
      category: "time",
      name: "3 hodiny",
      priceRegular: 400,
      priceReduced: 350,
      order: 3,
    });

    await ctx.db.insert("pricing", {
      category: "time",
      name: "4 hodiny",
      priceRegular: 450,
      priceReduced: 400,
      order: 4,
    });

    await ctx.db.insert("pricing", {
      category: "time",
      name: "5 hodin",
      priceRegular: 500,
      priceReduced: 440,
      order: 5,
    });

    // Seed pricing - Point tickets
    await ctx.db.insert("pricing", {
      category: "points",
      name: "5 jízd",
      priceRegular: 120,
      priceReduced: 100,
      order: 6,
    });

    await ctx.db.insert("pricing", {
      category: "points",
      name: "10 jízd",
      priceRegular: 170,
      priceReduced: 150,
      order: 7,
    });

    await ctx.db.insert("pricing", {
      category: "points",
      name: "20 jízd",
      priceRegular: 300,
      priceReduced: 260,
      order: 8,
    });

    await ctx.db.insert("pricing", {
      category: "points",
      name: "30 jízd",
      priceRegular: 420,
      priceReduced: 350,
      order: 9,
    });

    // Seed pricing - Kids area
    await ctx.db.insert("pricing", {
      category: "kids",
      name: "1 hodina",
      priceRegular: 100,
      order: 10,
    });

    await ctx.db.insert("pricing", {
      category: "kids",
      name: "2 hodiny",
      priceRegular: 150,
      order: 11,
    });

    await ctx.db.insert("pricing", {
      category: "kids",
      name: "3 hodiny",
      priceRegular: 200,
      order: 12,
    });

    // Seed news
    await ctx.db.insert("news", {
      title: "Areál v provozu",
      content: "Spousta sněhu - ideální podmínky - denně upravená sjezdovka. Ve všední dny krásné lyžování bez front!",
      isImportant: true,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("news", {
      title: "Důležité informace",
      content: "!!! OMLOUVÁME SE, ALE V NAŠEM AREÁLU NENÍ MOŽNO PLATIT PLATEBNÍ KARTOU !!!\n\n!!!Sáňkování a bobování je v celém areálu PŘÍSNĚ ZAKÁZÁNO!!!",
      isImportant: true,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Seed settings
    await ctx.db.insert("settings", {
      key: "contact_phone",
      value: "721115584",
    });

    await ctx.db.insert("settings", {
      key: "contact_email",
      value: "info@vlekychotoun.cz",
    });

    await ctx.db.insert("settings", {
      key: "rental_phone",
      value: "725922005",
    });

    await ctx.db.insert("settings", {
      key: "rental_email",
      value: "pujcovna@vlekychotoun.cz",
    });

    await ctx.db.insert("settings", {
      key: "school_phone",
      value: "721230700",
    });

    await ctx.db.insert("settings", {
      key: "school_email",
      value: "skolach@volny.cz",
    });

    return { message: "Database seeded successfully!" };
  },
});
