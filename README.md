# 🏠 The Housekraft — MoM Generator (Free with Gemini)

Record or upload a client meeting and instantly get a professional Minutes of Meeting.
Powered by **Google Gemini** — completely free.

---

## 🔑 Get your FREE Gemini API Key

1. Go to **aistudio.google.com**
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API Key"**
4. Copy the key — you'll need it in Step 3 below

---

## 🚀 Update your Vercel deployment

Since you already have the project on Vercel, just update the environment variable:

1. Go to **vercel.com** → your `housekraft-mom` project
2. Click **Settings** → **Environment Variables**
3. **Delete** the old `ANTHROPIC_API_KEY` if present
4. Click **Add** → Name: `GEMINI_API_KEY` → paste your Gemini key → Save
5. Go to **Deployments** → click the 3 dots on latest → **Redeploy**

Done! Your app is now 100% free to use.

---

## 📁 File Structure

```
vercel.json
api/
  generate.js      ← Gemini proxy (handles transcription + MoM)
public/
  index.html       ← Full app UI
```

## 💡 Gemini Free Tier Limits
- 15 requests per minute
- 1 million tokens per minute  
- Plenty for daily meeting use
