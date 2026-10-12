# Bhavesh & Heena Wedding Backend

## Vercel
- Set Root Directory to `backend` if this folder is inside your existing repository.
- Keep Framework Preset as FastAPI only if Vercel detects/builds the `api/index.py` entry point.
- `vercel.json` intentionally has no rewrites to avoid overriding automatic FastAPI routing.
- Add Environment Variables in Vercel: `DATABASE_URL`, `ADMIN_PASSWORD`, `TOKEN_SECRET`, `CORS_ORIGINS`.
- Set `CORS_ORIGINS` to the exact deployed frontend origin. Redeploy after environment changes.

## Endpoints
- `GET /` basic service response
- `GET /api/health` confirms whether DATABASE_URL is configured
- `GET /api/health/database` performs a real DB connection test
- `POST /api/wishes` body: `{"name":"...","message":"..."}`
- `POST /api/admin/login` body: `{"password":"..."}`
- `GET /api/admin/wishes` requires `Authorization: Bearer <token>`
- `DELETE /api/admin/wishes/{wish_id}` requires admin token

The `wedding_wishes` table is created on first save/list request. Blessings are stored in Neon, not WhatsApp.

## Local run
`python -m pip install -r requirements.txt`
`uvicorn api.index:app --reload`
Then open `http://127.0.0.1:8000/docs`.

Never commit the real `.env`, Neon URL, admin password, or token secret.
