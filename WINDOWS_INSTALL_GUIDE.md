# 🪟 Windows Installation Guide

## Known Issues & Solutions

### Issue 1: Sharp Installation Fails

**Error Messages:**
```
gyp ERR! build error
error: Python not found
npm ERR! gyp ERR!
```

**Solutions:**

#### Solution 1A: Install Python
1. Download Python from https://www.python.org/downloads/
2. **Important**: Check "Add Python to PATH" during installation
3. Run setup.bat again

#### Solution 1B: Use Pre-built Binary
```powershell
npm install --prefer-offline
```

#### Solution 1C: Skip Sharp (Alternative Image Processing)
Edit `package.json` and remove sharp, then use Node.js native image processing or an alternative.

### Issue 2: Node-Gyp Compilation Error

**Error:** `npm ERR! gyp ERR! compile error`

**Solution:**
Install Visual C++ Build Tools from Microsoft:
https://visualstudio.microsoft.com/downloads/

Select "Desktop development with C++"

### Issue 3: Port 3000 Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the number shown)
taskkill /PID <PID> /F

# Or use a different port
$env:PORT=3001; npm start
```

### Issue 4: Permission Denied (EACCES)

**Solution:**
1. Run PowerShell as Administrator
2. Navigate to project folder
3. Run `npm install` again

### Issue 5: Missing node_modules

**Error:** `Cannot find module 'express'`

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

---

## ✅ Step-by-Step Installation for Windows

### 1. Install Node.js
1. Go to https://nodejs.org (LTS version recommended)
2. Download the Windows installer
3. Run installer
4. **Check "Add to PATH"** during setup
5. Restart your computer

### 2. Verify Installation
```powershell
node --version
npm --version
```

### 3. Navigate to Project
```powershell
cd "C:\Users\Kit Computer\Desktop\ucpbleasingandfinancecorporation.com\cloned_ucpbleasingandfinancecorporation.com"
```

### 4. Install Dependencies
```powershell
npm install
```

**If Sharp fails:**
```powershell
npm install --build-from-source
```

### 5. Start Server
```powershell
npm start
```

### 6. Open Dashboard
Open browser and go to:
```
http://localhost:3000/admin-dashboard
```

---

## 🔍 Checking Installation

After `npm install`, verify:

1. **node_modules folder exists**
   ```powershell
   ls -la node_modules | head -20
   ```

2. **Required packages installed**
   ```powershell
   npm list express sharp axios
   ```

3. **Sharp working**
   ```powershell
   node -e "const sharp = require('sharp'); console.log('Sharp OK')"
   ```

---

## 💻 PowerShell vs Command Prompt

**Recommended: Use PowerShell**

To open PowerShell in Windows:
1. Press `Win + X`
2. Select "Windows PowerShell (Admin)"
3. Or search "powershell" in Start menu

---

## 🔧 Advanced Troubleshooting

### Check Node/npm Paths
```powershell
where node
where npm
```

### Verify npm Registry
```powershell
npm config get registry
```

Should be: `https://registry.npmjs.org/`

### Clear All Caches
```powershell
npm cache clean --force
npm ci  # Clean install
```

### Reinstall Sharp Specifically
```powershell
npm install sharp@latest --save
```

---

## 📞 Still Having Issues?

1. **Check error message carefully** - copy the full error
2. **Google the error** with "npm" or "node"
3. **Check your Node version** - must be v14+
4. **Try older Sharp version:**
   ```powershell
   npm install sharp@0.31.3
   ```

---

## ✨ Once Everything Works

You should see:
```
✓ Application initialized
✓ Starting server on http://localhost:3000
✓ Admin Dashboard: http://localhost:3000/admin-dashboard
```

Then open http://localhost:3000/admin-dashboard in your browser!

---

**Happy coding! 🎉**
