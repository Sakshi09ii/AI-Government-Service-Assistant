@echo off
echo ============================================
echo Starting Government Public Service AI Assistant
echo ============================================

REM Start Backend
start cmd /k "cd backend && .venv\Scripts\activate && uvicorn api:app --reload"

REM Wait for backend
timeout /t 5 > nul

REM Start Frontend
start cmd /k "cd frontend && npm run dev"

REM Wait for frontend
timeout /t 5 > nul

REM Open Browser
start http://localhost:3000

echo.
echo Project Started Successfully!
pause