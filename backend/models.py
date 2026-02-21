from sqlalchemy import Column, Integer, String, Float, DateTime, func
from datetime import datetime
from database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)  # 'income' or 'expense'
    category = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Transaction(id={self.id}, description={self.description}, amount={self.amount}, type={self.type}, category={self.category})>"
