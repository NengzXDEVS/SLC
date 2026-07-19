@echo off
REM UCPB Image Management System - Setup Script for Windows

echo.
echo 🚀 UCPB Image Management System Setup
echo =====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i

echo ✓ Node.js version: %NODE_VERSION%
echo ✓ npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✓ Dependencies installed successfully
) else (
    echo ❌ Error installing dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Setup completed successfully!
echo.
echo 🎯 Next steps:
echo 1. Start the server: npm start
echo 2. Open browser: http://localhost:3000/admin-dashboard
echo 3. Extract images from HTML
echo 4. Download and manage images
echo.
pause
