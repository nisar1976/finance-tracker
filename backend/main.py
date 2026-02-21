from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from typing import List
import os

from database import engine, get_db, Base
from models import Transaction
from schemas import TransactionCreate, TransactionUpdate, TransactionResponse, SummaryResponse

# Create tables on startup (only if not in test mode)
if not os.getenv("TESTING"):
    try:
        Base.metadata.create_all(bind=engine)
    except Exception:
        # Silently fail if database is not available (useful for testing)
        pass

app = FastAPI(title="Finance Tracker API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Finance Tracker API"}


@app.post("/transactions/", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    """Create a new transaction"""
    db_transaction = Transaction(
        description=transaction.description,
        amount=transaction.amount,
        type=transaction.type,
        category=transaction.category,
        date=transaction.date,
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@app.get("/transactions/", response_model=List[TransactionResponse])
def get_transactions(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
):
    """Get all transactions with optional pagination"""
    transactions = db.query(Transaction).offset(skip).limit(limit).all()
    return transactions


@app.get("/transactions/{transaction_id}", response_model=TransactionResponse)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    """Get a specific transaction by ID"""
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


@app.put("/transactions/{transaction_id}", response_model=TransactionResponse)
def update_transaction(
    transaction_id: int,
    transaction_update: TransactionUpdate,
    db: Session = Depends(get_db),
):
    """Update an existing transaction"""
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    update_data = transaction_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_transaction, field, value)

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@app.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    """Delete a transaction"""
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    db.delete(db_transaction)
    db.commit()
    return {"message": "Transaction deleted successfully"}


@app.get("/summary/", response_model=SummaryResponse)
def get_summary(db: Session = Depends(get_db)):
    """Get summary of transactions (income, expenses, balance by category)"""
    transactions = db.query(Transaction).all()

    total_income = 0.0
    total_expenses = 0.0
    by_category = {}

    for transaction in transactions:
        if transaction.type == "income":
            total_income += transaction.amount
        elif transaction.type == "expense":
            total_expenses += transaction.amount

        if transaction.category not in by_category:
            by_category[transaction.category] = 0.0
        by_category[transaction.category] += transaction.amount

    balance = total_income - total_expenses

    return SummaryResponse(
        total_income=total_income,
        total_expenses=total_expenses,
        balance=balance,
        by_category=by_category,
    )
