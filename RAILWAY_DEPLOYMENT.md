# 🚂 Railway Deployment - Complete Step-by-Step Guide

## What is Railway?
- Cloud platform for hosting Node.js apps
- Free $5 credit to start
- Auto-deploys from GitHub
- HTTPS included
- File storage included

---

## 📋 Prerequisites

You need:
1. ✅ **GitHub Account** (free at github.com)
2. ✅ **Railway Account** (free at railway.app)
3. ✅ **Your Project** (already ready!)

---

## ⚙️ STEP 1: Create GitHub Account & Repository

### 1A: Create GitHub Account
1. Go to **github.com**
2. Click "Sign up"
3. Enter email and password
4. Verify email
5. Skip personalization questions

### 1B: Create New Repository
1. Click **"+"** icon (top right) → "New repository"
2. **Repository name**: `ucpb-image-manager`
3. **Description**: "UCPB Image Management System"
4. Select **"Public"** (free tier requires public)
5. **Skip** "Add .gitignore" (you already have one)
6. Click **"Create repository"**

### 1C: Copy Your Repository URL
After creation, you'll see:
```
https://github.com/YOUR-USERNAME/ucpb-image-manager.git
```

**Copy this URL** - you'll need it next!

---

## 🔧 STEP 2: Push Your Code to GitHub

### Using PowerShell:

```powershell
# Navigate to your project
cd "C:\Users\Kit Computer\Desktop\ucpbleasingandfinancecorporation.com\cloned_ucpbleasingandfinancecorporation.com"

# Initialize Git
git init

# Configure Git (first time only)
git config --global user.email "your-email@gmail.com"
git config --global user.name "Your Name"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Image Management System"

# Rename branch to main
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/ucpb-image-manager.git

# Push to GitHub
git push -u origin main
```

**Replace** `YOUR-USERNAME` with your actual GitHub username!

### Expected Output:
```
Enumerating objects: 25, done.
Counting objects: 100% (25/25), done.
Writing objects: 100% (25/25), 15 KB, done.
...
To https://github.com/YOUR-USERNAME/ucpb-image-manager.git
 * [new branch]      main -> main
Branch 'main' set to track remote branch 'main' from 'origin'.
```

✅ **Your code is now on GitHub!**

---

## 🚀 STEP 3: Deploy on Railway

### 3A: Create Railway Account
1. Go to **railway.app**
2. Click **"Start New Project"**
3. Select **"Deploy from GitHub"**
4. Click **"Deploy"**

### 3B: Authorize GitHub
1. Click **"Authorize Railway"**
2. GitHub will ask permission
3. Click **"Authorize railway-app"**
4. You'll be redirected back to Railway

### 3C: Select Your Repository
1. Find **"ucpb-image-manager"** in the list
2. Click to select it
3. Railway auto-detects Node.js ✓

### 3D: Railway Deploys!
- Railway will:
  - Build your project
  - Install dependencies
  - Start the server
  - Generate a URL

⏳ **Wait 2-3 minutes for deployment**

---

## ✅ STEP 4: Get Your Live URL

### 4A: Find Your URL in Railway Dashboard
1. Go back to **railway.app**
2. Click on your project
3. Look for **"Deployments"** tab
4. Click the successful deployment
5. Find **"Public URL"** - copy it!

**Example**: `https://ucpb-image-manager-production.up.railway.app`

### 4B: Test Your Site
1. Open the URL in your browser
2. You should see your original website
3. Go to `/admin-dashboard` to see your admin panel

✅ **Your site is LIVE!**

---

## 📝 STEP 5: Environment Configuration (Optional)

If Railway doesn't work, add environment variables:

### 5A: In Railway Dashboard
1. Click your project
2. Click **"Variables"** tab
3. Click **"Add Variable"**
4. Add:
   ```
   PORT = 3000
   NODE_ENV = production
   ```
5. Click **"Deploy"** again

---

## 🔄 STEP 6: Auto-Deploy Setup (Automatic)

Railway **automatically deploys** when you push to GitHub!

### To Update Your Site:
```powershell
# Make changes to your files
# Example: edit dashboard.html

# Then push to GitHub:
git add .
git commit -m "Update dashboard UI"
git push

# Railway will automatically deploy! ✓
```

**No manual deployment needed - it's automatic!**

---

## 📊 Check Deployment Status

### View Logs in Railway:
1. Go to **railway.app**
2. Click your project
3. Click **"Deployments"**
4. Click latest deployment
5. See **"Build Logs"** and **"Runtime Logs"**

### If Something is Wrong:
- Check logs for errors
- Common issues below ↓

---

## 🆘 Troubleshooting

### Issue 1: "Command not found: git"
**Solution**: Install Git from https://git-scm.com
- Restart PowerShell after install

### Issue 2: "Permission denied" when pushing
**Solution**: Create GitHub Personal Access Token
1. Go to github.com → Settings → Developer settings → Personal tokens
2. Create new token with "repo" permission
3. Use this instead of password:
```powershell
git remote set-url origin https://YOUR-USERNAME:TOKEN@github.com/YOUR-USERNAME/ucpb-image-manager.git
```

### Issue 3: Deployment says "Failed"
**Solution**: Check logs in Railway
- Usually missing `npm install`
- Make sure all files were pushed

### Issue 4: "No public port" or "App not running"
**Solution**: 
1. Go to Railway dashboard
2. Click Variables
3. Add `PORT=3000`
4. Redeploy

### Issue 5: 502 Bad Gateway Error
**Solution**: App is probably still starting
- Wait 1-2 minutes
- Refresh page
- Check logs

---

## 📁 What Gets Deployed

Railway hosts:
- ✅ server.js
- ✅ api/ folder
- ✅ admin/ folder
- ✅ index.html
- ✅ public/ folder
- ✅ data/ folder (image database)

**Public folder**: Images are stored here
**data/ folder**: Image metadata stored in JSON

---

## 🌍 Custom Domain (Optional)

To use your own domain instead of `railway.app`:

### With GoDaddy or Namecheap:
1. Buy domain (e.g., `myucpbimages.com`)
2. Go to DNS settings
3. Add CNAME record pointing to Railway URL
4. In Railway, add your custom domain
5. Wait 24 hours for DNS update

---

## 🔐 Important Notes

### Storage
- Railway provides **1 GB storage** for free
- Your image database and downloaded images stored here
- If you exceed, upgrade plan

### Data Persistence
- Your `data/images.json` stays on Railway ✓
- Downloaded images in `public/images/` stay on Railway ✓
- No data is lost if app restarts

### Automatic Backups
- Download `data/images.json` regularly
- Store backup on your computer
- Command:
```powershell
# From your project folder:
git pull origin main
# Your data/images.json is now local!
```

---

## ✨ What's Working After Deploy

✅ **Admin Dashboard** - Full functionality
✅ **Image Extraction** - Scan HTML files
✅ **Image Download** - Download to Railway storage
✅ **Quality Control** - Adjust compression
✅ **Statistics** - Real-time tracking
✅ **Search** - Filter images
✅ **Original Website** - Still accessible

---

## 🎯 Quick Checklist

- [ ] Created GitHub account
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Created Railway account
- [ ] Deployed on Railway
- [ ] Got public URL
- [ ] Tested in browser
- [ ] Set up auto-deploy

---

## 📱 Access Your Site Anywhere

**Your URLs:**
- **Main site**: `https://yourapp.up.railway.app`
- **Admin panel**: `https://yourapp.up.railway.app/admin-dashboard`
- **API**: `https://yourapp.up.railway.app/api/images`

**Share these with:** Team, managers, clients

---

## 🆘 Still Having Issues?

Check these in order:

1. **GitHub push failed?**
   - Verify Git is installed
   - Check internet connection
   - Try with SSH key

2. **Railway deployment failed?**
   - Check Railway logs
   - Make sure package.json exists
   - Verify all files pushed to GitHub

3. **Site not loading?**
   - Check public URL is correct
   - Wait 5 minutes (might still be starting)
   - Refresh browser (Ctrl+Shift+R)
   - Check Railway logs

4. **Dashboard not working?**
   - Check browser console (F12)
   - Make sure backend is running
   - Try `/api/health` endpoint

---

## 📞 Need More Help?

Railway has great docs: **docs.railway.app**

Common commands after deployment:
```powershell
# See all branches
git branch -a

# See commit history
git log

# Update after making changes
git add .
git commit -m "Update description"
git push
```

---

## 🎉 You Did It!

Your site is now:
- ✅ Live online
- ✅ Accessible 24/7
- ✅ Auto-backed up
- ✅ Auto-updating from GitHub
- ✅ With custom admin panel
- ✅ Image management working

**Share your URL**: `https://yourapp.up.railway.app/admin-dashboard`

---

## Next: Setup Custom Domain

Want to use your own domain like `images.ucpbleasingandfinancecorporation.com`?

1. Buy domain (if not already owned)
2. Add CNAME record in DNS settings
3. Point to Railway URL
4. Add domain in Railway settings
5. Done! ✓

---

**Congratulations! Your project is live on Railway! 🚀**
