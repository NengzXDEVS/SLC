## ⚡ QUICK START GUIDE

### 📋 System Requirements
- Windows, macOS, or Linux
- Node.js v14+ (https://nodejs.org)
- npm (comes with Node.js)

---

## 🚀 Installation Steps

### Step 1: Navigate to Project
Open PowerShell/Terminal and go to the project directory:
```powershell
cd "C:\Users\Kit Computer\Desktop\ucpbleasingandfinancecorporation.com\cloned_ucpbleasingandfinancecorporation.com"
```

### Step 2: Run Setup
**On Windows:**
Double-click `setup.bat` OR run:
```powershell
npm install
```

**On macOS/Linux:**
```bash
bash setup.sh
```

### Step 3: Start Server
```powershell
npm start
```

You should see:
```
✓ Application initialized
✓ Starting server on http://localhost:3000
✓ Admin Dashboard: http://localhost:3000/admin-dashboard
```

### Step 4: Open Admin Dashboard
Open your browser and go to:
```
http://localhost:3000/admin-dashboard
```

---

## 📸 How to Use

### 1. Extract Images from HTML
1. Click "📥 Extract Images from HTML" button
2. Select `index.html`
3. Review the found images
4. Click "Add X Images to Database"

### 2. Download Images
**Option A: Download Individual Images**
- Click "✎ Edit" on any image
- Click "Download" button
- Adjust quality if needed (1-100%)
- Save changes

**Option B: Download All At Once**
- Click "⬇️ Download All Pending" button
- Wait for all images to download

### 3. Manage Images
- **Edit**: Change description and quality
- **Preview**: See image with current quality settings
- **Delete**: Remove image from database
- **Search**: Filter by URL or description

### 4. Monitor Progress
Dashboard shows:
- Total images tracked
- Downloaded count
- Images pending download
- Total storage size

---

## 🎯 Key Features

✅ Extract all images from HTML files
✅ Download and compress images locally
✅ Adjust compression quality (1-100%)
✅ Real-time image preview
✅ Search and filter images
✅ Track download statistics
✅ Beautiful admin dashboard
✅ RESTful API endpoints

---

## 📁 File Locations

After downloading images, you'll find them in:
```
public/images/
  ├── image-id-1.jpg
  ├── image-id-2.png
  └── ...
```

Image metadata stored in:
```
data/images.json
```

---

## 🔗 URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Original website |
| http://localhost:3000/admin-dashboard | Admin Dashboard |
| http://localhost:3000/api/images | Images API |
| http://localhost:3000/api/tracker | Tracker API |
| http://localhost:3000/api/health | Health check |

---

## 🐛 Troubleshooting

### "Port 3000 already in use"
Kill existing process or change port:
```powershell
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux  
lsof -i :3000
kill -9 <PID>
```

### Images won't download
- Check internet connection
- Verify image URL is publicly accessible
- Check browser console (F12) for errors
- Try downloading one image first

### npm install fails
Make sure Node.js is installed:
```powershell
node --version
npm --version
```

If `sharp` fails to install (Windows):
```powershell
npm install --build-from-source
```

### Permission denied errors
- Run as Administrator (Windows)
- Check folder permissions
- Ensure write access to `public/images` and `data`

---

## 💾 Saving Your Work

All downloaded images and metadata are automatically saved to:
- Images: `/public/images/`
- Metadata: `/data/images.json`

Back up the `data/images.json` file regularly!

---

## 🛑 Stopping the Server

Press `Ctrl+C` in the terminal where npm start is running.

---

## 📚 More Information

For detailed documentation, see: **README.md**

For API documentation, check the API routes in:
- `api/images.js`
- `api/tracker.js`

---

**Ready to get started? Run `npm start` now!** 🎉
