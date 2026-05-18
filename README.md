# iCitizen

Enterprise Citizen Management System

## Tech Stack

- Frontend:
  - HTML
  - CSS
  - JavaScript

- Backend:
  - FastAPI

- Database:
  - SQLite (Development)
  - MSSQL (Production)

## Features

- Signup/Login
- JWT Authentication
- Citizen CRUD
- Protected APIs
- Search
- Auto Age Calculation
- Validation
- Secure Password Hashing

## Run Backend

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload

Run Frontend

Open:

frontend/pages/login.html

Inside ROOT folder:

```bash id="f9v8mw"
git init