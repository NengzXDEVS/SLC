# 🌐 Hosting Guide - UCPB Image Management System

## Hosting Options Overview

| Platform | Cost | Setup | Performance | Recommendation |
|----------|------|-------|-------------|-----------------|
| **Vercel** | Free tier available | 5 min | ⭐⭐⭐⭐⭐ | Best for beginners |
| **Render** | Free tier available | 5 min | ⭐⭐⭐⭐ | Good free alternative |
| **Railway** | Pay-as-you-go | 5 min | ⭐⭐⭐⭐ | Easiest setup |
| **Heroku** | Paid only ($5+) | 5 min | ⭐⭐⭐ | Discontinued free tier |
| **DigitalOcean** | $5+/month | 15 min | ⭐⭐⭐⭐ | Good value |
| **AWS** | Free tier/Pay | 20+ min | ⭐⭐⭐⭐⭐ | Complex but powerful |

---

## 🚀 FASTEST OPTION: Railway.app (Recommended)

### Why Railway?
✅ Deploy in 5 minutes
✅ Free trial with $5 credit
✅ Automatic deployments
✅ File storage included
✅ MongoDB optional

### Step 1: Prepare Your Project

Create `Procfile` in root directory:
```
web: node server.js
```

Create `.env` file:
```
PORT=3000
NODE_ENV=production
```

### Step 2: Push to GitHub

1. Create GitHub account (if you don't have one)
2. Create new repository
3. Initialize Git:
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ucpb-image-manager.git
git push -u origin main
```

### Step 3: Deploy on Railway

1. Go to **railway.app**
2. Click "Start New Project"
3. Select "Deploy from GitHub"
4. Authorize GitHub
5. Select your repository
6. Railway auto-detects Node.js
7. Click "Deploy"

### Step 4: Configure Environment
1. Go to project settings
2. Add variables:
   - `PORT: 3000`
   - `NODE_ENV: production`
3. Railway assigns your URL automatically!

**Your site will be live at**: `https://yourapp.up.railway.app`

---

## ☁️ OPTION 2: Render.com

### Deployment Steps

1. **Create account** at render.com
2. **Connect GitHub** to Render
3. **Create New Service**:
   - Select "Web Service"
   - Choose your GitHub repo
   - Runtime: Node
   - Build: `npm install`
   - Start: `node server.js`
4. **Deploy**

**Free tier includes**: 0.5 GB RAM, auto sleep after 15 min inactivity

Your site: `https://yourapp.onrender.com`

---

## 📦 OPTION 3: Vercel (For Static Hosting)

**Note**: Vercel is better for static files, but can host Node.js with limitations.

### Alternative: Vercel + Backend Separation

Better approach is hosting static dashboard on Vercel + API elsewhere.

---

## 💻 OPTION 4: DigitalOcean (Best Value)

### Step 1: Create Droplet
1. Go to **digitalocean.com**
2. Create new Droplet (cheapest: $5/month)
3. Choose Ubuntu 22.04
4. SSH into server

### Step 2: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3: Clone & Deploy
```bash
cd ~
git clone YOUR-REPO-URL
cd yourapp
npm install
npm start
```

### Step 4: Keep Running (Using PM2)
```bash
sudo npm install -g pm2
pm2 start server.js --name "ucpb-images"
pm2 startup
pm2 save
```

### Step 5: Setup Domain
1. Buy domain (or use DigitalOcean)
2. Point DNS to Droplet IP
3. Setup Nginx reverse proxy

---

## 🔧 SETUP FOR ANY HOSTING

### Before Deploying

#### 1. Update package.json (scripts)
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### 2. Create Production Environment File
Create `.env.production`:
```
PORT=3000
NODE_ENV=production
```

#### 3. Update server.js for Production
Add at top of server.js:
```javascript
require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';
```

#### 4. Handle Static Files Better
Update server.js:
```javascript
// Ensure data directory exists on startup
const dataDir = path.join(__dirname, 'data');
const imagesDir = path.join(__dirname, 'public/images');

async function ensureDirectories() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.mkdir(imagesDir, { recursive: true });
  } catch (error) {
    console.error('Directory creation error:', error);
  }
}

ensureDirectories();
```

---

## 📊 RECOMMENDED DEPLOYMENT FLOW

### For Beginners → **Railway or Render**
- ✅ Easiest setup
- ✅ Free tier available
- ✅ Auto-deploys on Git push
- ✅ Built-in database options

### For Production → **DigitalOcean or AWS**
- ✅ More control
- ✅ Better performance
- ✅ Custom domain support
- ✅ Scalability options

---

## 🔐 Important Before Going Live

### Security Checklist
- [ ] Add `.env` to `.gitignore` (already done ✓)
- [ ] Remove debug logs in production
- [ ] Add rate limiting
- [ ] Add input validation
- [ ] Setup HTTPS (all hosts provide this)
- [ ] Add authentication for admin panel
- [ ] Regular backups of `data/images.json`

### Production server.js Update
```javascript
// Add rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

Install: `npm install express-rate-limit`

---

## 🌍 CUSTOM DOMAIN

### For Any Hosting Provider

1. **Buy Domain**: Namecheap, GoDaddy, Google Domains
2. **Get Nameservers** from hosting provider
3. **Update Domain Settings** to point to nameservers
4. **Wait 24-48 hours** for DNS propagation

### Example (Railway)
- Railway gives you: `yourapp.up.railway.app`
- Point custom domain: `mysite.com` → Railway nameservers
- Enable SSL certificate (usually automatic)

---

## 📝 STEP-BY-STEP: Railway Deployment

### 1. Initialize Git
```powershell
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repo
- Go to github.com
- Create new repository
- Name it: `ucpb-image-manager`

### 3. Push Code
```powershell
git remote add origin https://github.com/YOUR-USERNAME/ucpb-image-manager.git
git branch -M main
git push -u origin main
```

### 4. Deploy on Railway
- Go to railway.app
- Click "New Project"
- Select "Deploy from GitHub"
- Choose your repository
- Click "Deploy"
- Wait 2-3 minutes

### 5. Get Your URL
- Open Railway dashboard
- Copy the generated URL
- Share it: `https://yourapp.up.railway.app`

---

## 🆘 Troubleshooting Deployment

### Issue: "Port already in use"
**Solution**: Hosting platform assigns PORT automatically
```javascript
const PORT = process.env.PORT || 3000;
```
(Already done in server.js ✓)

### Issue: Data directory not found
**Solution**: Create on startup (already done ✓)

### Issue: Images not downloading
**Solution**: 
- Check temp storage limits
- Use cloud storage (AWS S3, etc.)
- Increase upload size limit

### Issue: Slow performance
**Solutions**:
- Upgrade hosting tier
- Enable image caching
- Use CDN for images
- Compress images more

---

## 💰 COST COMPARISON

| Service | Free | Paid |
|---------|------|------|
| Railway | $5 credit | Pay-as-you-go |
| Render | Limited | $7+/month |
| Vercel | Generous | $20+/month |
| DigitalOcean | None | $5+/month |
| Heroku | ❌ Discontinued | $7+/month |
| AWS | Limited | $0.01+/hour |

**Cheapest to Start**: Railway or Render (free tier)
**Best Long-term**: DigitalOcean ($5/month)

---

## 🎯 QUICK DEPLOYMENT (Choose One)

### Option A: Railway (5 min) ⭐ RECOMMENDED
```
1. Push to GitHub
2. Go to railway.app
3. Connect GitHub
4. Deploy
5. Done! ✓
```

### Option B: DigitalOcean (15 min)
```
1. Create $5/month Droplet
2. SSH in
3. Install Node.js
4. Clone repo
5. npm install && npm start
```

### Option C: Render (5 min)
```
1. Go to render.com
2. Connect GitHub
3. Create Web Service
4. Deploy
5. Done! ✓
```

---

## 📞 NEXT STEPS

1. Choose hosting option above
2. Prepare your GitHub repository
3. Follow deployment steps
4. Test the live site
5. Share your domain!

---

**Need help with a specific platform? Ask and I'll provide step-by-step instructions!**

Example: "How do I deploy on Railway?" or "Help me with DigitalOcean setup"
