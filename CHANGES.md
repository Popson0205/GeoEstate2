# GeoEstate — Bug Fix Package
Date: June 2026

## Files
- index.html   → GeoEstate2 repo root (replaces existing)
- server.js    → GeoEstate repo root  (replaces existing)

## Fixes Applied

### Fix 1a — updateClock TypeError (index.html)
`updateClock()` now guards against null before writing textContent.
Eliminates the flood of console errors on non-admin pages.

### Fix 1b — Missing admin-root div (index.html)
Added `<div id="admin-root">` to the HTML body before </body>.
This container is required for the admin panel to mount.

### Fix 2 — openAuthModal hoisted (index.html)
`openAuthModal()` is now defined in the early script block (line ~358)
so nav buttons can call it before the main 3000-line script block finishes parsing.

### Fix 3 — Supabase upload error logging (server.js)
`/upload-sign` now logs the exact Supabase error response to Railway console,
making it easy to diagnose bucket/key issues.

### Fix 4 — URL trailing slash normalisation (server.js)
`req.url` is now stripped of trailing slashes before route matching,
preventing POST /owner/verify-identity/ from falling through to 404.

## Still Required (env vars on Railway)
Set these in Railway → Your Service → Variables:
  SUPABASE_URL          = https://<your-project>.supabase.co
  SUPABASE_SERVICE_KEY  = <service_role key>
  SUPABASE_BUCKET       = geoestate-docs   (optional, this is the default)

The `geoestate-docs` bucket must exist in Supabase Storage and be set to public.

## Deploy Order
1. Push server.js to GeoEstate repo (Render auto-deploys)
2. Push index.html to GeoEstate2 repo
