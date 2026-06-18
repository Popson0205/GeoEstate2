GeoEstate — Complete Fix Package v2
=====================================
Date: June 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  server.js           → GeoEstate repo (backend)
  index.html          → GeoEstate2 repo (main website)
  owner-dashboard.html → GeoEstate2 repo
  sales.html          → GeoEstate2 repo
  geo-api.js          → GeoEstate2 repo (unchanged)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEPLOY ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — Push server.js to GeoEstate repo
         Render auto-deploys. Wait for green.

STEP 2 — REACTIVATE Render service
         Your service is currently SUSPENDED.
         Go to render.com → Dashboard → geoestate-api → Resume

STEP 3 — Add Render env vars (for Cloudinary):
         CLOUDINARY_CLOUD_NAME  = your cloud name
         CLOUDINARY_API_KEY     = your api key
         CLOUDINARY_API_SECRET  = your api secret
         (Free Cloudinary account: cloudinary.com)

STEP 4 — Wipe DB and seed 8 test properties with real images:
         POST https://geoestate.onrender.com/admin/seed-properties
         Header: Authorization: Bearer geoestate-admin-2024
         Body: {} (empty JSON)

         Quick curl:
         curl -X POST https://geoestate.onrender.com/admin/seed-properties \
           -H "Authorization: Bearer geoestate-admin-2024" \
           -H "Content-Type: application/json" \
           -d "{}"

STEP 5 — Push index.html, owner-dashboard.html, sales.html to GeoEstate2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT'S FIXED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Property detail page blank
   - /properties/:id now returns ALL fields: bedrooms, bathrooms,
     size_sqm, description, amenities, monthly_rent, sale_price,
     lease_price, images[]
   - renderDetail() now force-fetches fresh when cache is stale

2. No images on properties
   - 8 real test properties seeded with Unsplash images
   - Cloudinary integration for uploading new photos

3. Data not showing (main issue: Render is SUSPENDED)
   - API-down banner added to all 4 pages so you know when backend is down
   - Backend fix: all list + detail queries return full data

4. Owner dashboard
   - Cards now clickable → full detail modal
   - Add Property form has Cloudinary upload button
   - /owner/property/:id/detail endpoint added

5. Sales portal
   - API-down banner added
   - openPropertyModal already correct, now gets full data from fixed endpoint

6. Image hosting
   - Neon (Postgres) = for data/URLs only, NOT binary images
   - Cloudinary = for image files (free 25GB)
   - Upload flow: browser → POST /upload-sign → get Cloudinary signature
     → browser uploads directly to Cloudinary → stores URL in DB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEED PROPERTIES (8 test listings)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SEED-001  3 Bed Flat, Lekki Phase 1          RENT  ₦1.8M/yr
  SEED-002  5 Bed Duplex, Maitama Abuja        RENT  ₦6M/yr
  SEED-003  2 Bed Luxury Apt, Victoria Island  BUY   ₦85M
  SEED-004  4 Bed Terrace, Jabi Abuja          RENT  ₦3.5M/yr
  SEED-005  Prime Land 600sqm, Ibeju-Lekki     BUY   ₦15M
  SEED-006  1 Bed Mini Flat, Surulere Lagos    RENT  ₦650k/yr
  SEED-007  3 Bed Bungalow, Bodija GRA Ibadan  LEASE ₦2.4M
  SEED-008  Commercial Plaza, Allen Ave Ikeja  LEASE ₦12M/yr

All have real Unsplash images, full descriptions, amenities, coordinates.
