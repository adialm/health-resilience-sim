# Mapbox Setup Guide

## 🗺️ Get Your Mapbox Token (5 minutes)

### Step 1: Create a Mapbox Account

1. Go to https://account.mapbox.com/auth/signup/
2. Sign up with your email (free tier includes 50,000 map loads/month)
3. Verify your email address

### Step 2: Get Your Access Token

1. After logging in, you'll see your dashboard
2. Navigate to the "Access tokens" page: https://account.mapbox.com/access-tokens/
3. You'll see a **Default public token** already created
4. Click the token to copy it (it starts with `pk.`)

**Your token looks like:** `pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbG...` (much longer)

### Step 3: Add Token to Your Project

#### Option A: Create `.env` file manually

1. Navigate to the frontend directory:
   ```bash
   cd /Users/adialm/Desktop/health-resilience-sim/frontend
   ```

2. Create a `.env` file:
   ```bash
   touch .env
   ```

3. Open `.env` in your editor and add:
   ```
   REACT_APP_MAPBOX_TOKEN=pk.your_actual_token_here
   ```

4. **Important:** Replace `pk.your_actual_token_here` with your real token!

#### Option B: Use command line

```bash
cd /Users/adialm/Desktop/health-resilience-sim/frontend
echo "REACT_APP_MAPBOX_TOKEN=pk.your_actual_token_here" > .env
```

(Remember to replace with your actual token!)

### Step 4: Restart the Development Server

The `.env` file is only read when the server starts, so you need to restart:

1. Stop the current server (Ctrl + C)
2. Start it again:
   ```bash
   npm start
   ```

3. The map should now load at http://localhost:3000

---

## ✅ Verify It's Working

You should see:
- ✅ Real Boston map with streets and labels
- ✅ Colored neighborhood polygons (red/yellow/green)
- ✅ Hover tooltips when you mouse over neighborhoods
- ✅ Click neighborhoods to see details in the right panel
- ✅ Zoom and pan controls

If you see an error message instead, check:
- The token is correct and starts with `pk.`
- The `.env` file is in the `frontend/` directory (not the root)
- You restarted the dev server after adding the token

---

## 🔐 Security Notes

- ✅ **The `.env` file is already in `.gitignore`** - it won't be committed to Git
- ✅ **Public tokens are safe to use** - they're meant for client-side apps
- ✅ **Free tier is generous** - 50,000 map loads/month is plenty for development
- ⚠️ **Don't commit tokens** - always use `.env` files for sensitive data

---

## 🆓 Free Tier Limits

Mapbox free tier includes:
- ✅ 50,000 map loads per month
- ✅ Unlimited map views
- ✅ Full API access
- ✅ All map styles

For your hackathon project, this is more than enough!

---

## 🎨 Optional: Customize Map Style

If you want to change the map appearance, edit `src/components/map/mapConfig.ts`:

```typescript
// Current style (light theme)
export const mapStyle = 'mapbox://styles/mapbox/light-v11';

// Other options:
// 'mapbox://styles/mapbox/dark-v11'      // Dark theme
// 'mapbox://styles/mapbox/streets-v12'   // Detailed streets
// 'mapbox://styles/mapbox/outdoors-v12'  // Topographic
// 'mapbox://styles/mapbox/satellite-v9'  // Satellite imagery
```

---

## 🐛 Troubleshooting

### Problem: "Mapbox token not configured" error

**Solution:** 
- Check that `.env` file exists in `frontend/` directory
- Verify the token starts with `pk.`
- Restart the development server

### Problem: Map is blank or not loading

**Solution:**
- Open browser console (F12) and check for errors
- Verify your internet connection
- Check that the token is valid at https://account.mapbox.com/access-tokens/

### Problem: "Not authorized" or 401 error

**Solution:**
- Your token might be expired or invalid
- Generate a new token at https://account.mapbox.com/access-tokens/
- Update your `.env` file with the new token
- Restart the server

### Problem: Map loads but neighborhoods don't show

**Solution:**
- Check browser console for GeoJSON errors
- Verify mock data exists in `src/constants/mockData.ts`
- The neighborhoods might be loading - wait a few seconds

---

## 💡 Pro Tips

1. **Save your token**: Keep a copy of your token somewhere safe
2. **Multiple tokens**: You can create separate tokens for dev/production
3. **Token scopes**: You can restrict what each token can access
4. **Usage stats**: Check your usage at https://account.mapbox.com/

---

## 🎉 You're Done!

Once you see the map with colored neighborhoods, you're ready to demo! 

The map includes:
- ✅ Interactive Boston neighborhoods
- ✅ Color-coded by health risk
- ✅ Hover tooltips with health metrics  
- ✅ Click to view detailed information
- ✅ Smooth animations and transitions

**Enjoy your interactive health dashboard!** 🗺️✨

