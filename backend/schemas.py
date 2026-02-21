from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional


class TransactionCreate(BaseModel):
    description: str = Field(..., min_length=1, max_length=255)
    amount: float = Field(..., gt=0)
    type: str = Field(..., pattern="^(income|expense)$")
    category: str = Field(..., min_length=1, max_length=50)
    date: datetime


class TransactionUpdate(BaseModel):
    description: Optional[str] = Field(None, min_length=1, max_length=255)
    amount: Optional[float] = Field(None, gt=0)
    type: Optional[str] = Field(None, pattern="^(income|expense)$")
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    date: Optional[datetime] = None


class TransactionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    description: str
    amount: float
    type: str
    category: str
    date: datetime
    created_at: datetime


class SummaryResponse(BaseModel):
    total_income: float
    total_expenses: float
    balance: float
    by_category: dict
