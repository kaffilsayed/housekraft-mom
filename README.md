# 🏠 The Housekraft — MoM Generator

Record or upload a client meeting and instantly get a professional Minutes of Meeting document.

---

## 🚀 Deploy to Vercel (5 minutes, free forever)

### Step 1 — Create a GitHub account
Go to **github.com** and sign up (free). Skip if you already have one.

### Step 2 — Create a new repository
1. Click the **+** button → **New repository**
2. Name it: `housekraft-mom`
3. Set to **Private**
4. Click **Create repository**

### Step 3 — Upload the files
1. Click **uploading an existing file**
2. Drag and drop ALL files from this folder:
   - `vercel.json`
   - `api/claude.js`
   - `public/index.html`
   - `README.md`
3. Keep the folder structure exactly as-is (`api/` and `public/` folders)
4. Click **Commit changes**

### Step 4 — Deploy on Vercel
1. Go to **vercel.com** → Sign up with your GitHub account
2. Click **Add New Project**
3. Select your `housekraft-mom` repository
4. Click **Deploy** (no config needed — Vercel auto-detects everything)

### Step 5 — Add your Anthropic API Key
1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your API key (get it from console.anthropic.com)
3. Click **Save**
4. Go to **Deployments** → click the 3 dots on the latest → **Redeploy**

### Step 6 — Open on your phone
1. Vercel gives you a URL like `https://housekraft-mom.vercel.app`
2. Open it in Chrome/Safari on your phone
3. Tap the **Share** button → **Add to Home Screen**
4. It now works like an app! 📱

---

## 💡 Getting your Anthropic API Key
1. Go to **console.anthropic.com**
2. Sign up / log in
3. Go to **API Keys** → **Create Key**
4. Copy it and paste into Vercel (Step 5 above)

---

## Features
- 🎙 **Live recording** — tap to record, tap to stop
- ⬆ **Upload** — MP3, M4A, WAV, OGG supported
- 📄 **Auto MoM** — structured document with Discussion, Requirements, Action Items
- 🎤 **Full transcript** with speaker labels
- ⬇ **Download** as text file
