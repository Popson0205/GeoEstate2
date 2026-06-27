# GeoEstate — Fix Package v2
Date: June 2026

## Files
- index.html  → GeoEstate2 repo root
- server.js   → GeoEstate repo root

## Bugs Fixed This Round

### BUG 1 — "User not found" on identity verification
ROOT CAUSE (2-part):
  a) Frontend generates newUser.id = 'USR-' + Date.now() client-side,
     calls /register, then immediately calls /owner/verify-identity with
     that same id as the token. If the user "already registered",
     the server returned no submissionId, so the token id never matched
     the real DB row → 404 → "User not found".

  b) Even for new users, the server returned { success: true, submissionId }
     but the frontend never read regData.submissionId to update newUser.id.

FIX (index.html):
  After /register succeeds, newUser.id is now overwritten with
  regData.submissionId if present — guaranteeing the id the frontend
  uses matches what's actually in the DB.

FIX (server.js):
  /register now returns submissionId even on "Already registered",
  so the frontend always gets the canonical DB id back.

### BUG 2 — closeMobileNav not defined
ROOT CAUSE:
  Mobile nav buttons call closeMobileNav() at line 447, but the
  function is defined far later in the script (line ~5377 as part
  of toggleMobileNav logic). On fast taps before full parse, or
  if any script error occurs before that point, the function
  doesn't exist yet.

FIX (index.html):
  closeMobileNav() hoisted into the early <script> block (~line 358)
  alongside the openAuthModal() hoist from v1.

### BUG 3 — /upload-sign 500
(unchanged from v1 — requires env vars on Railway)
Set: SUPABASE_URL, SUPABASE_SERVICE_KEY
Create bucket: geoestate-docs (public, with INSERT policy)
Railway logs will now show exact Supabase error after this deploy.

## Carried Over from v1
- updateClock null guard (no more console flood)
- admin-root div added to HTML body
- URL trailing-slash normalization in server.js

## Deploy Order
1. Push server.js to GeoEstate (Render auto-deploys)
2. Push index.html to GeoEstate2
