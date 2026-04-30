#!/bin/bash
# Start Europe on Wheels – Backend + Frontend

echo "🚐  Starting Europe on Wheels..."

# Backend
cd "$(dirname "$0")/backend"
if [ ! -d ".venv" ]; then
  echo "📦  Creating Python venv..."
  python3 -m venv .venv
fi
source .venv/bin/activate
echo "📦  Installing backend dependencies..."
pip install -r requirements.txt -q
echo "🚀  Starting FastAPI on http://localhost:8000 ..."
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Frontend
cd "../frontend"
if [ ! -d "node_modules" ]; then
  echo "📦  Installing frontend dependencies..."
  npm install
fi
echo "🌐  Starting React on http://localhost:5173 ..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅  Both servers are running:"
echo "   Frontend → http://localhost:5173"
echo "   Backend  → http://localhost:8000"
echo "   API docs → http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Stopped.'" SIGINT SIGTERM
wait
