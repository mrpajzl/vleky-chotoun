# Bilingual Implementation Guide

## ✅ COMPLETED

### 1. Schema & Backend
- ✅ Updated Convex schema with `_cs` and `_en` fields for all content tables
- ✅ All mutations updated to accept bilingual data
- ✅ Schema deployed to production
- ✅ Backward compatible (old fields kept as optional)

### 2. Infrastructure
- ✅ Created comprehensive translation dictionary (`lib/translations.ts`)
- ✅ LanguageProvider context wrapping entire app
- ✅ LanguageSwitcher component in header
- ✅ `getLocalizedField()` helper function
- ✅ Header navigation using translations

## 🚧 TODO: Admin Pages (Pattern Established)

Each admin page needs bilingual input fields. Example pattern:

```tsx
// Example: /app/admin/cameras/page.tsx
const [formData, setFormData] = useState({
  name_cs: "",
  name_en: "",
  description_cs: "",
  description_en: "",
  // ... other fields
});

// In the form:
<div>
  <label>Name (Czech) *</label>
  <input
    value={formData.name_cs}
    onChange={(e) => setFormData({ ...formData, name_cs: e.target.value })}
  />
</div>

<div>
  <label>Name (English) *</label>
  <input
    value={formData.name_en}
    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
  />
</div>
```

### Admin Pages to Update:
1. `/app/admin/cameras/page.tsx` - Add name_cs/en, description_cs/en fields
2. `/app/admin/lifts/page.tsx` - Add name_cs/en fields
3. `/app/admin/pricing/page.tsx` - Add name_cs/en, description_cs/en fields
4. `/app/admin/news/page.tsx` - Add title_cs/en, content_cs/en fields

## 🚧 TODO: Frontend Pages

Each frontend page needs to use `useLanguage()` hook and `getLocalizedField()`:

```tsx
import { useLanguage, getLocalizedField } from "@/contexts/LanguageContext";

export default function MyPage() {
  const { locale, t } = useLanguage();
  const cameras = useQuery(api.cameras.list);

  return (
    <div>
      <h1>{t('cameras.title')}</h1>
      {cameras?.map(camera => (
        <div key={camera._id}>
          <h3>{getLocalizedField(camera, 'name', locale)}</h3>
          <p>{getLocalizedField(camera, 'description', locale)}</p>
        </div>
      ))}
    </div>
  );
}
```

### Frontend Pages to Update:
1. `/app/page.tsx` - Homepage (partially done - header)
2. `/app/kamery/page.tsx` - Cameras page
3. `/app/podminky/page.tsx` - Conditions page
4. `/app/cenik/page.tsx` - Pricing page
5. `/app/pujcovna/page.tsx` - Rental page (static content needs translation)
6. `/app/kontakt/page.tsx` - Contact page
7. `/components/Footer.tsx` - Footer links and text

## 📊 Migration Script Needed

Create a one-time migration to copy existing data to bilingual fields:

```typescript
// convex/migrations/001_add_bilingual.ts
import { mutation } from "./_generated/server";

export default mutation({
  handler: async (ctx) => {
    // Migrate cameras
    const cameras = await ctx.db.query("cameras").collect();
    for (const camera of cameras) {
      if (!camera.name_cs && camera.name) {
        await ctx.db.patch(camera._id, {
          name_cs: camera.name,
          name_en: camera.name, // Copy or translate
          description_cs: camera.description || "",
          description_en: camera.description || "",
        });
      }
    }
    // Repeat for lifts, pricing, news...
  },
});
```

## 🎯 Quick Start

1. **Test language switcher**: Click globe icon in header - should toggle CS/EN
2. **Update one admin page first** (e.g., cameras) as a test
3. **Add translations** to `lib/translations.ts` as needed
4. **Run migration** to populate bilingual fields from existing data
5. **Update frontend pages** one by one to use translations

## 💡 Tips

- Use `t('key')` for static UI text
- Use `getLocalizedField(obj, 'field', locale)` for database content
- Keep deprecated fields until all data is migrated
- Language preference is saved to localStorage
- Page refresh required after language switch (can be improved)

## Current Status
- Backend: ✅ 100% ready
- Frontend: ⏳ 10% (header only)
- Admin: ⏳ 0% (needs bilateral inputs)
- Translations: ✅ 80% (comprehensive dictionary created)
