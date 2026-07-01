# GeoEstate — Patch Deployment Guide
Generated: July 2026

## What's in this ZIP

| File | Repo | Notes |
|------|------|-------|
| `owner-dashboard.html` | GeoEstate2 | Full listing form upgrade (Rent/Sell/Lease + Shortlet) |
| `index.html` | GeoEstate2 | Cleaned Cloudinary → Supabase naming |
| `sales.html` | GeoEstate2 | No changes (included for completeness) |
| `geo-api.js` | GeoEstate2 | No changes (already clean) |
| `server.js` | GeoEstate (backend) | Cleaned + Railway env var header comment |

---

## Deploy Order

### Step 1 — GeoEstate (Backend / Railway)

Push `server.js` to your GeoEstate repo.
Railway will auto-redeploy.

**Required Railway Environment Variables** (set in Railway dashboard → Variables):

| Variable | Value |
|---|---|
| `SUPABASE_DB_URL` | Your Supabase PostgreSQL connection string |
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase `service_role` key |
| `SUPABASE_BUCKET` | `geoestate-docs` (or your bucket name) |
| `SECRET_RESEND_API_KEY` | Resend.com API key |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `JWT_SECRET` | Strong random string |

> Railway sets `PORT` automatically — do not override it.

---

### Step 2 — GeoEstate2 (Frontend)

Push these 4 files to your GeoEstate2 repo (root level):
- `owner-dashboard.html`
- `index.html`
- `sales.html`
- `geo-api.js`

GitHub Pages / Netlify will auto-deploy.

---

### Step 3 — Supabase Storage Setup

If not already done:
1. Go to Supabase → Storage → Create bucket: `geoestate-docs`
2. Set bucket to **Public** (so uploaded URLs are accessible)
3. Add RLS policy to allow unauthenticated reads (public bucket)

---

### Step 4 — Cloudflare DNS

Your domain (api.geoestate.com.ng) should point to Railway:

1. Railway → Your service → Settings → Domains → Add custom domain
2. Copy the Railway CNAME target (e.g. `xxx.railway.app`)
3. Cloudflare DNS → Add CNAME record:
   - Name: `api`
   - Target: `xxx.railway.app`
   - Proxy: **DNS only** (grey cloud) for Railway custom domains

---

## What Changed in owner-dashboard.html

### Listing Form — Transaction Type Driven

| Type | Key Changes |
|---|---|
| 🔑 **Rent** | Annual pricing (₦/yr) as default. Shortlet sub-type adds daily rate, min/max nights, check-in/out times, weekend rate, cleaning fee, house rules |
| 🏠 **Sell** | Dedicated sale form with mandatory legal document upload (at least 1 of: C of O, Deed of Assignment, Survey Plan, Building Approval). Sale Agreement upload separate. |
| 📋 **Lease** | Dedicated lease form: lease type, duration (1–99yr), escalation %, renewal option, permitted use, Lease Agreement upload |

### Upload System
- `ownerCloudinaryUpload()` and `ownerDocUpload()` → unified `ownerUpload()` backed by **Supabase Storage**
- Flow: `POST /upload-sign` (Railway) → signed PUT URL → direct upload to Supabase Storage
- No Cloudinary account needed
- Base64 fallback for images if storage not configured

### Unit Management
- **Fully intact** — no changes to unit modal, unit grid, `openUnitsModal()`, `loadAndRenderUnits()`, `openUnitEditModal()`, `saveUnitEdit()`, `submitAddUnit()`
