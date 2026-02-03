# 📘 Admin Guide - Daily Operations

Quick reference guide for managing Vleky Chotouň website content.

## 🔐 Admin Access

**URL**: https://your-site.vercel.app/admin  
**Password**: `vleky2026`

## 📅 Daily Tasks (5 minutes)

### Morning Checklist
1. **Update Operating Status** - Is the resort open today?
2. **Check Lifts** - Which lifts are operating?
3. **Update Conditions** - Snow depth, quality, temperature
4. **Post News** (if needed) - Any important announcements?

## 🎯 Quick Actions

### Update Resort Status

1. Go to **Admin Dashboard** → **Stav areálu**
2. Toggle **"Areál je v provozu"** checkbox
3. Update **Provozní doba** if changed (e.g., "9-21 (so+ne 8-21)")
4. Click **individual lifts** to toggle their status
5. Click **"Uložit stav areálu"**

✅ Changes appear on the website immediately!

### Update Snow Conditions

1. Go to **Admin Dashboard** → **Sněhové podmínky**
2. Update fields:
   - **Výška sněhu**: e.g., "100-140cm"
   - **Druh sněhu**: e.g., "technický+přírodní"
   - **Kvalita podmínek**: Select from dropdown
   - **Teplota**: Optional, e.g., "-5°C"
3. Preview appears at bottom
4. Click **"Uložit podmínky"**

### Post an Announcement

1. Go to **Admin Dashboard** → **Aktuality**
2. Click **"Přidat aktualitu"**
3. Fill in:
   - **Název**: Short title
   - **Obsah**: Full message
   - **Důležité**: Check for yellow highlight at top
   - **Aktivní**: Check to publish
4. Click **"Uložit"**

**Examples**:
- "Skvělé podmínky dnes!" - Regular news
- "Pozor: Omezený provoz zítra" - Mark as Important

### Manage Webcams

1. Go to **Admin Dashboard** → **Webkamery**
2. To **edit** a camera:
   - Click pencil icon
   - Update name, description, or URL
   - Click "Uložit"
3. To **add** a camera:
   - Click "Přidat kameru"
   - Fill in details
   - Set order (1, 2, 3...)
   - Click "Uložit"

**Camera URL Tips**:
- Use direct image URLs: `https://example.com/camera.jpg`
- Images auto-refresh every 30 seconds
- Test URL in browser first

## 🎨 Content Tips

### Writing Announcements

**Good Examples**:
```
Title: Výborné podmínky celý týden!
Content: Čerstvý sníh, perfektně upravené sjezdovky. 
Přijďte si užít lyžování!
```

```
Title: Speciální akce pro rodiny
Content: O víkendu sleva 20% na rodinné jízdenky. 
Platí 15.-17. února.
Important: ✓
```

**Bad Examples**:
```
Title: test
Content: test
(Not helpful for visitors!)
```

### Operating Hours Format

Standard format: `9-21 (so+ne 8-21)`

Other examples:
- `9-20` (weekdays only)
- `8-21` (same hours every day)
- `9-17 (zkrácená provozní doba)` (with note)

## 📊 Understanding Dashboard

### Status Colors

**Operating Status**:
- 🟢 Green = Resort is OPEN
- 🔴 Red = Resort is CLOSED

**Lifts**:
- 🟢 Green = Lift is OPERATING
- ⚪ Gray = Lift is NOT OPERATING

**News**:
- 🟡 Yellow badge = Important (displayed at top)
- 🟢 Green badge = Active (visible to public)
- ⚪ Gray badge = Inactive (hidden)

### What Visitors See

All changes appear **immediately** on:
- Home page (`/`)
- Webkamery page (`/kamery`)
- Podmínky page (`/podminky`)
- Ceník page (`/cenik`)

## 🔔 Important Notes

### DO's ✅
- Update conditions daily (or when they change)
- Turn off resort status when closed
- Post important news as "Důležité"
- Keep camera URLs up to date
- Use clear, friendly language

### DON'Ts ❌
- Don't delete all cameras (visitors need to see conditions!)
- Don't mark everything as "Important" (loses impact)
- Don't forget to toggle "Aktivní" when posting news
- Don't use special characters in URLs
- Don't delete old pricing (edit instead)

## 📱 Mobile Admin

The admin panel works on phones and tablets:
1. Login the same way
2. All features work on mobile
3. Use landscape mode for better view
4. Test changes on mobile site too!

## 🆘 Common Issues

### "Cannot save" error
- Check your internet connection
- Refresh the page and try again
- Contact support if persists

### Cameras not showing
- Verify camera URL is correct
- Check "Aktivní" checkbox is on
- Try the URL in a new browser tab

### Changes not appearing
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Wait 30 seconds and refresh

## 📞 Need Help?

**Technical Issues**:
- Check DEPLOYMENT.md for troubleshooting
- Verify at Convex Dashboard: https://dashboard.convex.dev
- Check Vercel status: https://vercel.com/dashboard

**Content Questions**:
- Keep it simple and visitor-friendly
- Focus on: conditions, status, and important updates
- Less is more - don't overwhelm visitors

## 🎯 Weekly Checklist

**Monday Morning**:
- [ ] Update opening hours for the week
- [ ] Check all cameras are working
- [ ] Post weekly forecast if available

**Daily** (5 min):
- [ ] Update operating status
- [ ] Update snow conditions
- [ ] Toggle lift status
- [ ] Post any news/changes

**After Bad Weather**:
- [ ] Update conditions immediately
- [ ] Post important notice if needed
- [ ] Update lift status if affected

**End of Season**:
- [ ] Set "Areál uzavřen"
- [ ] Post closure announcement
- [ ] Thank visitors for the season!

## 🌟 Pro Tips

1. **Use the preview**: Always check the preview before saving
2. **Mobile first**: Most visitors use phones - test on mobile!
3. **Be specific**: "100cm sněhu" is better than "hodně sněhu"
4. **Update regularly**: Even "no changes" shows you're active
5. **Photos help**: If you update camera URLs with fresh images, visitors trust conditions more

## 🎉 Success Metrics

Your website is successful when:
- Visitors see current conditions
- Cameras show live footage
- Status matches reality
- Important news is visible
- Mobile experience is smooth

**Remember**: This site helps people plan their visit. Keep it accurate and up-to-date! 🎿
