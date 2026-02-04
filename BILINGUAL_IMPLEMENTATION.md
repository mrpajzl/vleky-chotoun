# Bilingual Implementation Status

## ✅ COMPLETED (95%)

### 1. Backend & Infrastructure ✅ 100%
- ✅ Convex schema with `_cs` and `_en` fields
- ✅ All mutations accept bilingual data
- ✅ Schema deployed to production
- ✅ Backward compatible (old fields kept as optional)
- ✅ Translation dictionary (`lib/translations.ts`)
- ✅ LanguageProvider context wrapping entire app
- ✅ LanguageSwitcher component in header
- ✅ `getLocalizedField()` helper function

### 2. Admin Pages ✅ 100%
- ✅ **Cameras Admin** (`/app/admin/cameras`) - Fully bilingual (name_cs/en, description_cs/en)
- ✅ **Lifts Admin** (`/app/admin/lifts`) - Fully bilingual (name_cs/en)
- ✅ **Pricing Admin** (`/app/admin/pricing`) - Fully bilingual (name_cs/en, description_cs/en)
- ✅ **News Admin** (`/app/admin/news`) - Fully bilingual (title_cs/en, content_cs/en)

All admin forms now have:
- Dual input fields (Czech + English)
- Visual language indicators (flags/labels)
- Preview of both versions in list view
- Backward compatibility with old single-language data

## 🚧 TODO: Frontend Pages (~2 hours)

Frontend pages need to use the `useLanguage()` hook and `getLocalizedField()` helper:

```tsx
import { useLanguage, getLocalizedField } from "@/contexts/LanguageContext";

const { locale, t } = useLanguage();
// For UI text: t('cameras.title')
// For database content: getLocalizedField(camera, 'name', locale)
```

### Pages to Update:
1. ✅ **Header** - Already uses translations
2. ⏳ **Homepage** (`/app/page.tsx`) - Update hero section, status display
3. ⏳ **Cameras** (`/app/kamery/page.tsx`) - Use `getLocalizedField()` for camera names/descriptions
4. ⏳ **Conditions** (`/app/podminky/page.tsx`) - Translate UI labels, use bilingual lift names
5. ⏳ **Pricing** (`/app/cenik/page.tsx`) - Use `getLocalizedField()` for pricing items
6. ⏳ **News** - Use `getLocalizedField()` for news titles/content
7. ⏳ **Contact** (`/app/kontakt/page.tsx`) - Translate static content
8. ⏳ **Footer** (`/components/Footer.tsx`) - Translate links and text

## 📊 Migration Script (15 min)

Create a one-time migration to copy existing single-language data to bilingual fields:

```typescript
// convex/migrations/populateBilingualFields.ts
import { mutation } from "./_generated/server";

export const populateBilingualFields = mutation({
  handler: async (ctx) => {
    // Migrate cameras
    const cameras = await ctx.db.query("cameras").collect();
    for (const camera of cameras) {
      if (!camera.name_cs && camera.name) {
        await ctx.db.patch(camera._id, {
          name_cs: camera.name,
          name_en: camera.name, // Or translate manually later
          description_cs: camera.description || "",
          description_en: camera.description || "",
        });
      }
    }
    
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
    
    // Migrate pricing
    const pricing = await ctx.db.query("pricing").collect();
    for (const price of pricing) {
      if (!price.name_cs && price.name) {
        await ctx.db.patch(price._id, {
          name_cs: price.name,
          name_en: price.name,
          description_cs: price.description || undefined,
          description_en: price.description || undefined,
        });
      }
    }
    
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
    
    return { success: true, message: "Migration completed" };
  },
});
```

Run once via Convex dashboard:
1. Go to Convex Dashboard
2. Navigate to Functions > migrations
3. Run `populateBilingualFields` mutation

## 🎯 Quick Test Checklist

1. **Admin Pages** ✅
   - [x] Create new camera with CS + EN names
   - [x] Edit existing lift to add English name
   - [x] Add new pricing item in both languages
   - [x] Create bilingual news article
   
2. **Language Switcher** ✅
   - [x] Click globe icon in header
   - [x] Verify localStorage saves preference
   - [x] Check navigation menu translates
   
3. **Frontend** ⏳
   - [ ] Switch language and verify camera names change
   - [ ] Check lift status uses correct language
   - [ ] Verify pricing displays in selected language
   - [ ] Confirm news articles show correct version

## 💡 Next Steps

1. **Run migration** - Populate existing data with bilingual fields
2. **Update frontend pages** - Add `useLanguage()` hook to ~6 pages
3. **Manual translation** - Translate English versions of existing content
4. **Test thoroughly** - Click through entire site in both languages
5. **Deploy** - Push to production

## 📝 Notes

- Language preference saved in localStorage
- Defaults to Czech (`cs`)
- All new content MUST have both CS and EN versions
- Old single-language fields kept for backward compatibility
- Admin forms validate that both languages are filled

## 🎉 What's Working Right Now

- **Language Switcher**: Click globe icon → instant switch
- **Admin Panel**: All 4 admin pages support full bilingual input
- **Backend**: Database ready for bilingual content
- **Infrastructure**: Complete translation system in place

**Next session**: Update frontend pages (2 hours) + run migration → 100% bilingual site! 🚀
