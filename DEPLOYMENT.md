# 🚀 Deployment Guide - Vleky Chotouň

Complete step-by-step guide to deploy your ski resort website to production.

## ✅ Prerequisites

- GitHub account (✓ Done - repo at https://github.com/mrpajzl/vleky-chotoun)
- Vercel account (free tier is fine)
- Convex account (free tier is fine)

## 📋 Deployment Steps

### Step 1: Set Up Convex Backend

1. **Go to Convex Dashboard**
   - Visit: https://dashboard.convex.dev
   - Sign in or create account (use GitHub for easy auth)

2. **Create New Project**
   - Click "Create a project"
   - Name it: `vleky-chotoun`
   - Select region: `Europe (Frankfurt)` or closest to Czech Republic

3. **Link Local Project**
   ```bash
   cd /Users/ondrejzraly/clawd/vleky-chotoun
   npx convex dev
   ```
   - Follow the prompts to link to your new Convex project
   - This will create `.env.local` with your `NEXT_PUBLIC_CONVEX_URL`

4. **Seed the Database**
   - Open Convex Dashboard
   - Go to "Functions" → "seed"
   - Click `seedData` mutation
   - Click "Run" (no arguments needed)
   - You should see: `{ message: "Database seeded successfully!" }`

5. **Verify Data**
   - Go to "Data" tab in Convex Dashboard
   - You should see tables: cameras, conditions, lifts, news, pricing, settings, operatingStatus
   - All should have data populated

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in (use GitHub account)

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose: `mrpajzl/vleky-chotoun`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_CONVEX_URL = https://your-project.convex.cloud
   ```
   Get this URL from your Convex dashboard or `.env.local` file.

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a live URL: `https://vleky-chotoun.vercel.app` (or similar)

#### Option B: Via Vercel CLI

```bash
cd /Users/ondrejzraly/clawd/vleky-chotoun

# Login to Vercel (opens browser)
vercel login

# Deploy
vercel --prod

# Add environment variable
vercel env add NEXT_PUBLIC_CONVEX_URL production
# Paste your Convex URL when prompted
```

### Step 3: Deploy Convex to Production

After Vercel deployment is successful:

```bash
cd /Users/ondrejzraly/clawd/vleky-chotoun
npx convex deploy --cmd 'npm run build'
```

This will:
- Deploy your Convex functions to production
- Create production database
- You'll get a production Convex URL

**Important**: If you get a new production URL, update it in Vercel:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Update `NEXT_PUBLIC_CONVEX_URL` with the production URL
- Redeploy: Vercel Dashboard → Deployments → Click "..." → Redeploy

### Step 4: Seed Production Database

1. Go to Convex Dashboard
2. Switch to "Production" environment (top-right dropdown)
3. Go to Functions → seed → seedData
4. Click "Run"
5. Verify data in Data tab

### Step 5: Test Everything

1. **Visit your live site**: `https://vleky-chotoun.vercel.app` (your actual URL)

2. **Check public pages**:
   - Home page - Live cameras should be visible
   - Webkamery page - All 3 cameras
   - Podmínky - Operating status and lift info
   - Ceník - All pricing displayed
   - Kontakt - Contact information

3. **Test Admin Panel**:
   - Go to `/admin`
   - Login with password: `vleky2026`
   - Try updating conditions or adding news
   - Verify changes appear on public site immediately

4. **Test Live Cameras**:
   - Cameras should auto-refresh every 30 seconds
   - Click refresh button manually
   - Verify "LIVE" badge is visible

### Step 6: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to Settings → Domains
   - Add your domain (e.g., `www.vlekychotoun.cz`)
   - Follow DNS configuration instructions

2. **Update DNS**:
   - Add A or CNAME records as instructed by Vercel
   - Wait for propagation (5-60 minutes)

## 🔧 Post-Deployment Configuration

### Update Camera URLs

The site currently uses URLs from the old website. To use your own cameras:

1. Go to `/admin/cameras`
2. Edit each camera
3. Update "URL obrázku" with your camera stream URL
4. Save

### Daily Operations

1. **Update Operating Status** (`/admin/status`):
   - Toggle "Areál je v provozu"
   - Update opening hours if changed
   - Toggle individual lift status

2. **Update Snow Conditions** (`/admin/conditions`):
   - Update snow depth
   - Change snow type
   - Set quality rating
   - Add temperature

3. **Post News** (`/admin/news`):
   - Add important announcements
   - Mark as "Důležité" for yellow highlight
   - Toggle "Aktivní" to publish/unpublish

### Auto-Deploy on Git Push

Your Vercel deployment is connected to the GitHub repo. Any push to `main` branch will trigger automatic deployment:

```bash
cd /Users/ondrejzraly/clawd/vleky-chotoun

# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel will automatically deploy in ~2 minutes
```

## 🎯 Final Checklist

- [ ] Convex project created and linked
- [ ] Database seeded with initial data
- [ ] Vercel project deployed successfully
- [ ] Environment variables configured
- [ ] Production Convex deployed
- [ ] Production database seeded
- [ ] Admin panel accessible and working
- [ ] All cameras displaying correctly
- [ ] All pages load correctly
- [ ] Mobile responsive (test on phone)
- [ ] Admin login works (password: `vleky2026`)

## 🆘 Troubleshooting

### Cameras not loading
- Check camera URLs in `/admin/cameras`
- Verify URLs are publicly accessible
- Try adding `?t=${timestamp}` to force refresh

### Admin panel not accessible
- Clear browser cache
- Try incognito/private mode
- Check Convex deployment status

### Data not updating
- Verify Convex is connected (check browser console)
- Check environment variable `NEXT_PUBLIC_CONVEX_URL`
- Redeploy if needed

### Build errors
- Run `npm run build` locally to test
- Check all imports are correct
- Verify all environment variables are set

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Check Convex Dashboard logs
3. Check Vercel deployment logs
4. Verify all environment variables are set correctly

## 🎉 Success!

Your ski resort website is now live! 

**Important URLs to save:**
- Live Website: https://your-domain.vercel.app
- GitHub Repo: https://github.com/mrpajzl/vleky-chotoun
- Convex Dashboard: https://dashboard.convex.dev
- Vercel Dashboard: https://vercel.com/dashboard
- Admin Panel: https://your-domain.vercel.app/admin

**Default Admin Password**: `vleky2026`
(Consider changing this in production by updating the check in `app/admin/page.tsx`)
