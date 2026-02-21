import pytest
from datetime import datetime
from fastapi.testclient import TestClient


def test_create_transaction(client: TestClient):
    """Test creating a new transaction"""
    response = client.post(
        "/transactions/",
        json={
            "description": "Grocery shopping",
            "amount": 50.0,
            "type": "expense",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == "Grocery shopping"
    assert data["amount"] == 50.0
    assert data["type"] == "expense"
    assert data["category"] == "food"
    assert "id" in data
    assert "created_at" in data


def test_get_transactions(client: TestClient):
    """Test retrieving all transactions"""
    # Create a transaction first
    client.post(
        "/transactions/",
        json={
            "description": "Test transaction",
            "amount": 100.0,
            "type": "income",
            "category": "salary",
            "date": datetime.now().isoformat(),
        },
    )

    response = client.get("/transactions/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["description"] == "Test transaction"


def test_get_transaction_by_id(client: TestClient):
    """Test retrieving a specific transaction"""
    # Create a transaction first
    create_response = client.post(
        "/transactions/",
        json={
            "description": "Specific transaction",
            "amount": 75.0,
            "type": "expense",
            "category": "transport",
            "date": datetime.now().isoformat(),
        },
    )
    transaction_id = create_response.json()["id"]

    response = client.get(f"/transactions/{transaction_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == transaction_id
    assert data["description"] == "Specific transaction"


def test_update_transaction(client: TestClient):
    """Test updating a transaction"""
    # Create a transaction first
    create_response = client.post(
        "/transactions/",
        json={
            "description": "Original description",
            "amount": 50.0,
            "type": "expense",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
    )
    transaction_id = create_response.json()["id"]

    # Update it
    update_response = client.put(
        f"/transactions/{transaction_id}",
        json={
            "description": "Updated description",
            "amount": 75.0,
        },
    )
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["description"] == "Updated description"
    assert data["amount"] == 75.0


def test_delete_transaction(client: TestClient):
    """Test deleting a transaction"""
    # Create a transaction first
    create_response = client.post(
        "/transactions/",
        json={
            "description": "To be deleted",
            "amount": 50.0,
            "type": "expense",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
    )
    transaction_id = create_response.json()["id"]

    # Delete it
    delete_response = client.delete(f"/transactions/{transaction_id}")
    assert delete_response.status_code == 200

    # Verify it's deleted
    get_response = client.get(f"/transactions/{transaction_id}")
    assert get_response.status_code == 404


def test_validation_error_invalid_type(client: TestClient):
    """Test validation error for invalid transaction type"""
    response = client.post(
        "/transactions/",
        json={
            "description": "Invalid type",
            "amount": 50.0,
            "type": "invalid_type",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
    )
    assert response.status_code == 422  # Validation error


def test_validation_error_zero_amount(client: TestClient):
    """Test validation error for zero or negative amount"""
    response = client.post(
        "/transactions/",
        json={
            "description": "Zero amount",
            "amount": 0.0,
            "type": "expense",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
    )
    assert response.status_code == 422  # Validation error


def test_validation_error_missing_field(client: TestClient):
    """Test validation error for missing required field"""
    response = client.post(
        "/transactions/",
        json={
            "description": "Missing amount",
            "type": "expense",
            "category": "food",
            "date": datetime.now().isoformat(),
        },
    )
    assert response.status_code == 422  # Validation error


def test_get_nonexistent_transaction(client: TestClient):
    """Test getting a nonexistent transaction"""
    response = client.get("/transactions/999")
    assert response.status_code == 404
