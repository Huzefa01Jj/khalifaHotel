@echo off
REM Navigate to project directory
cd /d "C:\Users\Huzefa\Desktop\Coding projects\hotel_landing page\hotel-frontend"

REM Configure git
git config --global user.name "Huzefa"
git config --global user.email "huzefa@example.com"

REM Initialize git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Khalifa Hotel luxury booking system - Full-featured hotel website with authentication, booking system, admin panel, and responsive design"

REM Display the next steps
echo.
echo ============================================
echo GIT SETUP COMPLETE!
echo ============================================
echo.
echo Next steps:
echo 1. Create a NEW repository on GitHub at https://github.com/new
echo 2. Copy the HTTPS URL from your new repository
echo 3. Run this command with YOUR_REPO_URL replaced:
echo.
echo git remote add origin YOUR_REPO_URL
echo git branch -M main
echo git push -u origin main
echo.
echo Example:
echo git remote add origin https://github.com/yourusername/khalifa-hotel-website.git
echo.
pause
