# Claude Code Project Guidance

## Project Overview
Personal Finance Tracker — a full-stack application for tracking income and expenses.

**Stack:** Next.js 16 (frontend) + FastAPI (backend) + Neon PostgreSQL (database)

**Tools:** uv (Python package manager), Node.js, npm

---

## Project Structure
```
Finance_tracker_project/
├── backend/              # FastAPI application
│   ├── main.py          # FastAPI app + endpoints
│   ├── database.py      # SQLAlchemy setup
│   ├── models.py        # Transaction model
│   ├── schemas.py       # Pydantic schemas
│   ├── pyproject.toml   # uv config
│   └── tests/           # pytest tests
├── frontend/            # Next.js application
│   ├── app/            # App router pages
│   ├── components/     # React components
│   └── __tests__/      # Component tests
├── README.md           # Setup instructions
├── SPEC.md            # Task checklist
└── .gitignore         # Version control patterns
```

---

## Key Conventions

**Backend:**
- FastAPI with SQLAlchemy ORM
- PostgreSQL via Neon (production) or SQLite (testing)
- CORS enabled for `http://localhost:3000` and `http://127.0.0.1:3000`
- All transaction fields: id, description, amount, type (income/expense), category, date, created_at
- Categories: food, transport, shopping, bills, entertainment, health, education, salary, freelance, other

**Frontend:**
- Next.js App Router with TypeScript
- Tailwind CSS for styling
- Server Actions for API calls
- Recharts for visualizations
- Vitest + React Testing Library for tests

**Database:**
- Production: Neon PostgreSQL (DATABASE_URL from environment)
- Testing: SQLite in-memory (`:memory:`)

---

## Running the Project

**Backend:**
```bash
cd backend
uv run uvicorn main:app --reload
```
Visit `http://localhost:8000/docs` for interactive API docs.

**Frontend:**
```bash
cd frontend
npm run dev
```
Visit `http://localhost:3000` in your browser.

**Backend Tests:**
```bash
cd backend
uv run pytest -v
```

---

## Environment Variables

**Backend (.env):**
- `DATABASE_URL` — PostgreSQL connection string

**Frontend (.env.local):**
- `NEXT_PUBLIC_API_URL` — Backend API URL (default: `http://localhost:8000`)

---

## Testing Strategy
- Backend: SQLite in-memory fixture to avoid database dependencies
- Frontend: Component tests with mock server actions
- All tests should pass before deployment

---

## Notes
- No automatic commits; explicitly create commits when changes are complete
- Prefer editing existing files over creating new ones
- Keep solutions simple and focused; avoid over-engineering
- Always read files before modifying them

