# Fixed Files — Drop-In Replacements

Replace the matching files in your repos with these, then commit and push as normal.

## GeoEstate (backend repo)
- `.env.backend` → replace `GeoEstate/.env.backend`
- `README.md` → replace `GeoEstate/README.md`
- **Also delete** `GeoEstate/render.yaml` — it declared the wrong env var name
  (`SECRET_NEON_DATABASE_URL`) and Railway (not Render) is your actual deploy target
  per `DEPLOY-ORDER.md`.

**These are docs/templates only — the real fix is in Railway's dashboard.** Go to your
GeoEstate service → Variables, and make sure these exact names are set (this is what
`server.js` actually reads):

```
SUPABASE_DB_URL
SUPABASE_URL
SUPABASE_SERVICE_KEY
SUPABASE_BUCKET
ADMIN_EMAIL
ADMIN_PASSWORD
JWT_SECRET
SECRET_RESEND_API_KEY
```

`server.js` calls `process.exit(1)` on boot if `ADMIN_EMAIL`, `ADMIN_PASSWORD`, or
`JWT_SECRET` are missing/misnamed — that's what was causing the 502 (the app crash-loops,
so it never comes up to add CORS headers, which is why the browser reported it as a CORS
error). Redeploy after fixing the variable names, then confirm:
```
curl https://api.geoestate.com.ng/health
```
returns `{"status":"ok",...}`.

## GeoEstate2 (frontend repo)
- `index.html` → replace `GeoEstate2/index.html`
- `owner-dashboard.html` → replace `GeoEstate2/owner-dashboard.html`
- `partner.html` → replace `GeoEstate2/partner.html`
- **Also delete** `GeoEstate2/geo-api_final.js` — stale duplicate of `geo-api.js`,
  not referenced by any HTML file, and actually out of date despite `DEPLOY-ORDER.md`
  claiming they were identical.

What changed in these three files:
- Removed the broken `onchange="populateLGAs(...)"` attributes on the `fp-state`,
  `buy-state`, and `lease-state` selects (function name typo — `populateLGAs` never existed,
  only `populateLGA`).
- Properly wired `populateLGA('fp-state','fp-lga')` etc. into each file's page-load
  initialization instead, matching the pattern already used for the other state selects.
- `owner-dashboard.html` was missing the entire Nigeria state→LGA dataset and function —
  added both (copied from `index.html`).

After deploying, test: open List Property / Buy / Lease forms (and the owner dashboard's
Add Property flow) and confirm picking a State populates the LGA dropdown with no console
errors.
