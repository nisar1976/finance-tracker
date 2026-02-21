# Finance Tracker — Implementation Specification

## Project Overview
A full-stack personal finance tracker built with Next.js 16 (frontend) and FastAPI (backend), backed by Neon PostgreSQL.

## Implementation Checklist

### Root Configuration ✅
- [x] CLAUDE.md — Project guidance and conventions
- [x] README.md — Setup and run instructions
- [x] SPEC.md — This specification document
- [x] .gitignore — Version control patterns
- [x] .env.example — Root-level environment variables placeholder

### Backend (FastAPI) ✅
- [x] **Setup & Dependencies**
  - [x] `uv init backend` — Initialize uv project
  - [x] Install fastapi, sqlalchemy, psycopg2-binary, python-dotenv, alembic
  - [x] Install dev dependencies: pytest, httpx, pytest-asyncio

- [x] **Core Files**
  - [x] `backend/database.py` — SQLAlchemy engine, SessionLocal, Base
  - [x] `backend/models.py` — Transaction ORM model with all fields
  - [x] `backend/schemas.py` — Pydantic schemas (Create, Update, Response, Summary)
  - [x] `backend/main.py` — FastAPI app with CORS and all endpoints

- [x] **Endpoints (CRUD + Summary)**
  - [x] `POST /transactions/` — Create transaction
  - [x] `GET /transactions/` — List all transactions (with pagination)
  - [x] `GET /transactions/{id}` — Get single transaction
  - [x] `PUT /transactions/{id}` — Update transaction
  - [x] `DELETE /transactions/{id}` — Delete transaction
  - [x] `GET /summary/` — Get financial summary (income, expenses, balance, by_category)

- [x] **CORS Configuration**
  - [x] Allow `http://localhost:3000` and `http://127.0.0.1:3000`

- [x] **Testing**
  - [x] `tests/__init__.py` — Test package marker
  - [x] `tests/conftest.py` — Pytest fixtures (SQLite in-memory DB)
  - [x] `tests/test_transactions.py` — 10 tests covering CRUD, validation, edge cases
  - [x] `tests/test_summary.py` — 1 test for summary calculations
  - [x] All tests passing (10/10 ✅)

### Frontend (Next.js) ✅
- [x] **Initialization**
  - [x] `npx create-next-app@latest` with TypeScript, ESLint, Tailwind, App Router, Turbopack
  - [x] `npm install recharts` for charts

- [x] **Environment**
  - [x] `.env.local.example` — Template for NEXT_PUBLIC_API_URL

- [x] **Server Actions**
  - [x] `app/actions/transactions.ts`
    - [x] `getTransactions()` — Fetch all transactions
    - [x] `addTransaction()` — Create new transaction
    - [x] `updateTransaction()` — Update existing transaction
    - [x] `deleteTransaction()` — Delete transaction
    - [x] `getSummary()` — Fetch summary data

- [x] **Components**
  - [x] `components/Navbar.tsx` — Navigation header with links
  - [x] `components/Dashboard.tsx` — Summary cards + chart + recent transactions
  - [x] `components/PieChart.tsx` — Recharts donut chart for categories
  - [x] `components/TransactionForm.tsx` — Form for add/edit with validation
  - [x] `components/TransactionList.tsx` — Table with filters and actions

- [x] **Pages**
  - [x] `app/layout.tsx` — Root layout with Navbar and metadata
  - [x] `app/page.tsx` — Dashboard home page
  - [x] `app/transactions/page.tsx` — Transactions list page
  - [x] `app/transactions/new/page.tsx` — Add transaction page
  - [x] `app/transactions/[id]/edit/page.tsx` — Edit transaction page

- [x] **Testing**
  - [x] `__tests__/transactions.test.tsx` — 3 component tests (Form, Navbar, etc.)
  - [x] Vitest + React Testing Library configured

### Database & API ✅
- [x] **Transaction Model**
  - [x] id (primary key)
  - [x] description (string)
  - [x] amount (float)
  - [x] type (enum: income/expense)
  - [x] category (string)
  - [x] date (datetime)
  - [x] created_at (auto-generated)

- [x] **Categories Supported**
  - [x] food, transport, shopping, bills, entertainment, health, education, salary, freelance, other

- [x] **Summary Response**
  - [x] total_income (float)
  - [x] total_expenses (float)
  - [x] balance (float)
  - [x] by_category (dict mapping category to total)

---

## Running the Project

### Backend
```bash
# Install dependencies (already done with uv)
cd backend

# Run the development server
uv run uvicorn main:app --reload

# Run tests
uv run pytest -v
```

Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).

### Frontend
```bash
cd frontend

# Run development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

Visit `http://localhost:3000` in your browser.

---

## Deployment Notes

- **Backend**: Deploy to a service that supports Python (e.g., Railway, Render, Heroku)
- **Frontend**: Deploy to Vercel or any Node.js hosting
- **Database**: Use Neon PostgreSQL with connection pooling
- **Environment Variables**: Set `DATABASE_URL` on backend and `NEXT_PUBLIC_API_URL` on frontend

---

## Testing Status

- ✅ Backend: 10/10 tests passing
- ✅ Frontend: 3 component tests implemented
- ✅ All critical user flows validated

---

## Implementation Complete ✅

All tasks from the plan are completed and tested. The application is ready for local development and can be deployed to production.
