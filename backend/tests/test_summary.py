import pytest
from datetime import datetime
from fastapi.testclient import TestClient


def test_get_summary(client: TestClient):
    """Test getting summary with multiple transactions"""
    # Add some transactions
    transactions = [
        {
            "description": "Salary",
            "amount": 5000.0,
            "type": "income",
            "category": "salary",
            "date": datetime.now().isoformat(),
        },
        {
            "description": "Freelance work",
            "amount": 1000.0,
            "type": "income",
            "category": "freelance",
            "date": datetime.now().isoformat(),
        },
        {
            "description": "Groceries",
            "amount": 100.0,
            "type": "expense",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
        {
            "description": "Gas",
            "amount": 50.0,
            "type": "expense",
            "category": "transport",
            "date": datetime.now().isoformat(),
        },
        {
            "description": "Dinner",
            "amount": 30.0,
            "type": "expense",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
    ]

    for transaction in transactions:
        client.post("/transactions/", json=transaction)

    # Get summary
    response = client.get("/summary/")
    assert response.status_code == 200

    data = response.json()
    assert data["total_income"] == 6000.0
    assert data["total_expenses"] == 180.0
    assert data["balance"] == 5820.0
    assert data["by_category"]["salary"] == 5000.0
    assert data["by_category"]["freelance"] == 1000.0
    assert data["by_category"]["food"] == 130.0
    assert data["by_category"]["transport"] == 50.0
