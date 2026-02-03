# Vleky Chotouň - Moderní webové stránky lyžařského areálu

Modern, production-ready website for Vleky Chotouň ski resort with live webcams and full admin panel.

## 🎿 Features

- **Live Webcams** - Real-time camera feeds with auto-refresh every 30 seconds
- **Current Conditions** - Snow depth, weather, lift status
- **Operating Hours** - Real-time status of resort and lifts
- **Pricing** - Complete pricing with regular and reduced rates
- **News & Announcements** - Important updates and announcements
- **Admin Panel** - Full content management system
- **Mobile-First** - Fully responsive design
- **Real-time Updates** - Powered by Convex backend

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database)
- **Hosting**: Vercel
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/mrpajzl/vleky-chotoun.git
cd vleky-chotoun
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
npx convex dev
```
Follow the prompts to create a new Convex project or link to an existing one.

4. Seed the database:
Go to Convex Dashboard and run the `seed:seedData` mutation to populate initial data.

5. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```
Update with your Convex URL.

6. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Admin Panel

Access the admin panel at `/admin`.

**Default password**: `vleky2026`

The admin panel allows you to:
- Manage webcams (add/edit/remove camera URLs)
- Update operating status and lift conditions
- Edit snow conditions and weather
- Manage pricing
- Create and publish news/announcements

## 🎥 Webcam Setup

The website currently uses static image URLs from the old site:
- Camera 1: `https://www.vlekychotoun.cz/camera/w1-0.jpg`
- Camera 2: `https://www.vlekychotoun.cz/camera/w2-0.jpg`
- Camera 3: `https://www.vlekychotoun.cz/camera/w3-0.jpg`

To update cameras:
1. Go to `/admin/cameras`
2. Edit existing cameras or add new ones
3. Enter the camera image URL (can be JPEG image URL, IP camera snapshot, or embed URL)

Images auto-refresh every 30 seconds on the frontend.

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import from GitHub: `mrpajzl/vleky-chotoun`
   - Add environment variable: `NEXT_PUBLIC_CONVEX_URL`
   - Deploy!

3. Deploy Convex production:
```bash
npx convex deploy --cmd 'npm run build'
```

4. Update Vercel environment variable with production Convex URL.

## 📊 Database Schema

The Convex database includes:
- `cameras` - Webcam configurations
- `operatingStatus` - Resort open/closed status
- `lifts` - Individual lift status
- `conditions` - Snow depth, type, quality
- `pricing` - Ticket prices (time-based, point-based, kids)
- `news` - Announcements and updates
- `settings` - Contact info and general settings

## 🛠️ Development

Start dev server with hot reload:
```bash
npm run dev
```

The Convex backend will automatically sync in development mode.

## 📝 Content Management

All content is managed through the admin panel (`/admin`):

1. **Daily Updates**: Update operating status, lift status, and snow conditions
2. **Webcams**: Manage camera feeds and their display order
3. **News**: Post important announcements and updates
4. **Pricing**: Update ticket prices for the season

## 🔒 Security Notes

- Admin authentication is currently password-based (simple but functional)
- For production, consider implementing proper authentication (e.g., Clerk, Auth.js)
- Store sensitive data in environment variables
- Use HTTPS in production (handled by Vercel)

## 📞 Contact Information

- **Areál**: 721 115 584 | info@vlekychotoun.cz
- **Půjčovna**: 725 922 005 | pujcovna@vlekychotoun.cz
- **Škola**: 721 230 700 | skolach@volny.cz

## 📄 License

Private project for Vleky Chotouň ski resort.

## 🙏 Credits

Built with ❤️ using Next.js, Convex, and Tailwind CSS.
