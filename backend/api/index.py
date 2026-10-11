import hashlib
import hmac
import os
import secrets
import time
from datetime import datetime, timezone

import psycopg
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

app = FastAPI(title="Bhavesh & Heena Wedding Guestbook")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip().rstrip("/") for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if origin.strip()],
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

DATABASE_URL = os.getenv("DATABASE_URL", "")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")
TOKEN_SECRET = os.getenv("TOKEN_SECRET", "")

class WishInput(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    message: str = Field(min_length=1, max_length=1000)

class LoginInput(BaseModel):
    password: str = Field(min_length=1, max_length=256)

def get_connection():
    if not DATABASE_URL:
        raise HTTPException(status_code=503, detail="Guestbook database is not configured yet.")
    return psycopg.connect(DATABASE_URL, connect_timeout=8)

def ensure_table(conn):
    conn.execute("""
        CREATE TABLE IF NOT EXISTS wedding_wishes (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            message VARCHAR(1000) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    """)

def sign_token(payload):
    signature = hmac.new(TOKEN_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}.{signature}"

def validate_token(token):
    if not token or not TOKEN_SECRET:
        return False
    try:
        payload, signature = token.rsplit(".", 1)
        expected = hmac.new(TOKEN_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected):
            return False
        expiry = int(payload.split(":", 1)[0])
        return expiry > int(time.time())
    except (ValueError, IndexError):
        return False

def require_admin(authorization):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required.")
    if not validate_token(authorization[7:].strip()):
        raise HTTPException(status_code=401, detail="Invalid or expired admin token.")
    return True

@app.get("/api/health")
def health():
    return {"ok": True, "database_configured": bool(DATABASE_URL)}

@app.post("/api/wishes")
def create_wish(body: WishInput, request: Request):
    # Lightweight honeypot and length validation; database-backed storage persists across deployments.
    if len(body.name.strip()) == 0 or len(body.message.strip()) == 0:
        raise HTTPException(status_code=422, detail="Please enter your name and blessings.")
    try:
        with get_connection() as conn:
            ensure_table(conn)
            row = conn.execute(
                "INSERT INTO wedding_wishes (name, message) VALUES (%s, %s) RETURNING id",
                (body.name.strip(), body.message.strip())
            ).fetchone()
            conn.commit()
        return {"ok": True, "id": row[0]}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=503, detail="Could not save your blessings right now. Please try again.")

@app.post("/api/admin/login")
def admin_login(body: LoginInput):
    if not ADMIN_PASSWORD or not TOKEN_SECRET:
        raise HTTPException(status_code=503, detail="Admin login is not configured. Set ADMIN_PASSWORD and TOKEN_SECRET.")
    if not hmac.compare_digest(body.password.encode(), ADMIN_PASSWORD.encode()):
        # Avoid exposing which part of the login was incorrect.
        raise HTTPException(status_code=401, detail="Incorrect password.")
    payload = f"{int(time.time()) + 60 * 60 * 12}:{secrets.token_urlsafe(12)}"
    return {"token": sign_token(payload), "expires_in": 43200}

@app.get("/api/admin/wishes")
def list_wishes(authorization: str = Header(default="")):
    require_admin(authorization)
    try:
        with get_connection() as conn:
            ensure_table(conn)
            rows = conn.execute(
                "SELECT id, name, message, created_at FROM wedding_wishes ORDER BY created_at DESC LIMIT 1000"
            ).fetchall()
        return {"wishes": [
            {"id": row[0], "name": row[1], "message": row[2],
             "created_at": row[3].astimezone(timezone.utc).isoformat()}
            for row in rows
        ]}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=503, detail="Could not load the guestbook.")

@app.delete("/api/admin/wishes/{wish_id}")
def delete_wish(wish_id: int, authorization: str = Header(default="")):
    require_admin(authorization)
    try:
        with get_connection() as conn:
            ensure_table(conn)
            cursor = conn.execute("DELETE FROM wedding_wishes WHERE id = %s", (wish_id,))
            conn.commit()
            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Blessing not found.")
        return {"ok": True}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=503, detail="Could not delete this blessing.")
