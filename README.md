# GeoEstate API v2.1

Node.js + PostgreSQL (Supabase) — Deployed on Railway

## Environment Variables (set in Railway dashboard)

| Variable | Description |
|---|---|
| `SUPABASE_DB_URL` | Supabase Postgres connection string (Settings → Database → URI, Transaction pooler, port 6543) |
| `SUPABASE_URL` | Supabase project URL, e.g. `https://YOURREF.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase **service_role** key (NOT the anon key) |
| `SUPABASE_BUCKET` | Supabase Storage bucket name (`geoestate-docs`) — must exist and be Public |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `JWT_SECRET` | 64-char hex secret used to sign admin/owner JWTs — generate with `openssl rand -hex 32` |
| `SECRET_RESEND_API_KEY` | Resend email API key |

> ⚠️ `server.js` calls `process.exit(1)` on boot if `ADMIN_EMAIL`, `ADMIN_PASSWORD`, or `JWT_SECRET` are missing.
> If Railway's variables don't exactly match the names above, the app crash-loops and
> `api.geoestate.com.ng` will return `502 Bad Gateway` for every request (which then also
> shows up in the browser as a false-looking CORS error, since the request never reaches
> the app to add CORS headers).

## Deploy on Railway

1. Create a new Railway project → "Deploy from GitHub repo"
2. Select `Popson0205/GeoEstate`
3. Set the environment variables above (exact names matter)
4. Railway builds via Nixpacks and runs `node server.js` (see `railway.json`)
5. Add custom domain: `api.geoestate.com.ng` in Railway → Settings → Networking
6. Watch deploy logs for: `✅ GeoEstate API v2.1 running on port 3000`
7. Verify: `curl https://api.geoestate.com.ng/health` → `{"status":"ok","version":"2.0"}`

## Database Setup

Run `schema.sql` once against your Supabase database (Supabase Dashboard → SQL Editor),
or via psql:

```bash
psql "$SUPABASE_DB_URL" -f schema.sql
```

To wipe test/seed data, run `clear-test-data.sql`:

```bash
psql "$SUPABASE_DB_URL" -f clear-test-data.sql
```

Also create a **Public** Supabase Storage bucket named `geoestate-docs`
(Storage → New bucket), allowed MIME `image/*, application/pdf`, matching `SUPABASE_BUCKET`.

## Admin Authentication

`POST /admin/login` with `{ email, password }` → returns a signed JWT.
All other `/admin/*` routes require:
```
Authorization: Bearer <jwt>
```

## Owner Authentication

1. `POST /owner/login` with `{ email }` → OTP sent
2. `POST /owner/login` with `{ email, code }` → returns a signed JWT `token`
3. Use token: `Authorization: Bearer <jwt>`

## Health Check

`GET /health` — Returns `{ status: "ok", service: "GeoEstate API", version: "2.0" }`
