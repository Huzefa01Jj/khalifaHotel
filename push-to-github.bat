@echo off
REM Script to push Khalifa Hotel project to GitHub

echo ============================================
echo PUSHING KHALIFA HOTEL TO GITHUB
echo ============================================
echo.

REM Navigate to project directory
cd /d "C:\Users\Huzefa\Desktop\Coding projects\hotel_landing page\hotel-frontend"

echo Current directory: %cd%
echo.

REM Check if git is available
git --version
if errorlevel 1 (
    echo.
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo.
echo Step 1: Checking git status...
git status
echo.

echo Step 2: Adding all files...
git add .
echo Files added!
echo.

echo Step 3: Creating commit...
git commit -m "Initial commit: Khalifa Hotel luxury booking system - Full-featured hotel website with authentication, booking system, admin panel, and responsive design"
echo.

echo Step 4: Adding remote repository...
git remote add origin https://github.com/Huzefa01Jj/khalifaHotel.git
echo.

echo Step 5: Renaming branch to main...
git branch -M main
echo.

echo Step 6: Pushing to GitHub...
echo Please wait, this may take a moment...
git push -u origin main
echo.

if errorlevel 0 (
    echo.
    echo ============================================
    echo SUCCESS! Your project is now on GitHub!
    echo ============================================
    echo.
    echo View your repository at:
    echo https://github.com/Huzefa01Jj/khalifaHotel
    echo.
) else (
    echo.
    echo There was an error pushing to GitHub
    echo Make sure:
    echo 1. Git is installed
    echo 2. GitHub credentials are set up
    echo 3. Repository exists on GitHub
    echo.
)

pause
