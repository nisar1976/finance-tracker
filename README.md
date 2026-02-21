# 💰 Finance Tracker

A modern, full-stack personal finance tracker application for managing income, expenses, and financial summaries.

**Tech Stack:** Next.js 16 • FastAPI • PostgreSQL (Neon) • Tailwind CSS • Recharts

---

## 📋 Features

- **Dashboard** — View financial summary with total income, expenses, balance
- **Transaction Management** — Add, edit, delete income and expense transactions
- **Category Tracking** — Organize transactions by category (food, transport, salary, etc.)
- **Visual Analytics** — Donut chart showing spending breakdown by category
- **Transaction List** — View all transactions with filters by category and type
- **Responsive Design** — Works on desktop, tablet, and mobile devices
- **Real-time Updates** — Changes reflected immediately across the app

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Python 3.10+** and `uv` package manager
- **PostgreSQL** (Neon account recommended for cloud) or local PostgreSQL instance

### 1. Clone and Setup
```bash
# Navigate to project
cd Finance_tracker_project

# Set up backend environment
cp backend/.env.example backend/.env
# Edit backend/.env and add your DATABASE_URL

# Set up frontend environment
cp frontend/.env.local.example frontend/.env.local
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies (using uv)
uv sync

# Run migrations (if using alembic)
# uv run alembic upgrade head

# Run development server
uv run uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`
API docs: `http://localhost:8000/docs` (Swagger UI)

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
uv run pytest -v
```

All tests use an in-memory SQLite database to avoid external dependencies.

### Frontend Tests
```bash
cd frontend
npm run test
```

---

## 📁 Project Structure

```
Finance_tracker_project/
├── backend/                    # FastAPI application
│   ├── main.py               # FastAPI app + endpoints
│   ├── database.py           # SQLAlchemy setup
│   ├── models.py             # Transaction model
│   ├── schemas.py            # Pydantic schemas
│   ├── pyproject.toml        # uv config
│   └── tests/                # Test suite
├── frontend/                 # Next.js application
│   ├── app/                  # Pages and server actions
│   ├── components/           # React components
│   ├── __tests__/            # Component tests
│   └── package.json
├── CLAUDE.md                 # Development guide
├── SPEC.md                   # Implementation specification
└── README.md                 # This file
```

---

## 🔧 Configuration

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/finance_tracker
```

For Neon PostgreSQL:
```
DATABASE_URL=postgresql://user:password@ep-xxxxx.us-east-1.neon.tech/finance_tracker?sslmode=require
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/transactions/` | Create transaction |
| GET | `/transactions/` | List all transactions |
| GET | `/transactions/{id}` | Get transaction by ID |
| PUT | `/transactions/{id}` | Update transaction |
| DELETE | `/transactions/{id}` | Delete transaction |
| GET | `/summary/` | Get financial summary |

---

## 🎨 UI Components

### Pages
- **Dashboard** — Home page with overview and charts
- **Transactions** — Full list of transactions with filters
- **Add/Edit Transaction** — Form for creating and updating transactions

### Components
- **Navbar** — Navigation header with quick links
- **Dashboard** — Summary cards and charts
- **TransactionList** — Filterable transaction table
- **TransactionForm** — Add/edit form with validation
- **PieChart** — Category spending visualization

---

## 🌐 Categories

Supported transaction categories:
- food
- transport
- shopping
- bills
- entertainment
- health
- education
- salary
- freelance
- other

---

## 🚢 Deployment

### Backend (FastAPI)
1. Push code to GitHub
2. Deploy to Railway, Render, or Heroku:
   ```bash
   uv sync
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
3. Set `DATABASE_URL` environment variable

### Frontend (Next.js)
1. Push code to GitHub
2. Connect to Vercel for automatic deployment
3. Set `NEXT_PUBLIC_API_URL` environment variable pointing to backend URL

---

## 📝 Development Notes

- See `CLAUDE.md` for coding conventions and project structure details
- See `SPEC.md` for complete implementation checklist
- Backend uses SQLAlchemy ORM for database operations
- Frontend uses Next.js Server Actions for API calls
- All tests use in-memory databases for isolation

---

## 🤝 Contributing

To extend the application:
1. Follow the existing code structure and conventions
2. Add tests for new features
3. Update documentation as needed
4. Use TypeScript on frontend, Python type hints on backend

---

## 📄 License

This project is open source. Modify and use as needed!

---

## ❓ Troubleshooting

### Backend won't connect to database
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running (if using local)
- Verify network connectivity (if using cloud)

### Frontend can't reach backend
- Verify backend is running on http://localhost:8000
- Check NEXT_PUBLIC_API_URL in .env.local
- Check CORS settings in backend/main.py

### Tests failing
- Backend: Ensure all dependencies are installed with `uv sync`
- Frontend: Clear node_modules and reinstall with `npm install`

---

**Happy tracking! 💚**
