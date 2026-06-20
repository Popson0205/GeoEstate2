GeoEstate — Complete Fix Package v3
=====================================
Date: June 2026
API: https://geo-estate-phi.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILES & WHERE THEY GO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  server.js            → GeoEstate repo root (backend)
  index.html           → GeoEstate2 repo root
  owner-dashboard.html → GeoEstate2 repo root
  sales.html           → GeoEstate2 repo root
  geo-api.js           → GeoEstate2 repo root

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEPLOY ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — Push server.js to GeoEstate repo
         Render (geoestate-api-clpa) auto-deploys.

STEP 2 — Push all 4 frontend files to GeoEstate2 repo.

STEP 3 — DB is already seeded ✅ (done live)
         8 test properties with real images are in the DB.

STEP 4 (optional) — Add Cloudinary env vars on Render for image uploads:
         CLOUDINARY_CLOUD_NAME  = your cloud name
         CLOUDINARY_API_KEY     = your api key
         CLOUDINARY_API_SECRET  = your api secret
         Free account at cloudinary.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IF YOU NEED TO RE-SEED THE DB LATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After server.js is deployed, run:
  curl -X POST https://geo-estate-phi.vercel.app/admin/seed-properties \
    -H "Authorization: Bearer geoestate-admin-2024" \
    -H "Content-Type: application/json" \
    -d "{}"
This wipes + reinserts the 8 clean test properties.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMAGE HOSTING: CLOUDINARY vs NEON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Neon (Postgres) = stores image URLs as text. NOT for binary files.
  Cloudinary      = stores actual image files. Free tier = 25GB.

  Upload flow (already built in):
    Browser → POST /upload-sign on your backend
           → backend returns Cloudinary signed params
           → Browser uploads directly to Cloudinary (no Render bandwidth used)
           → Cloudinary returns secure_url
           → URL saved to properties.img / properties.images in Neon

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT'S FIXED IN THIS PACKAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Property detail blank
   - All 3 backend queries expanded to return full fields
     (bedrooms, bathrooms, size_sqm, description, amenities,
      monthly_rent, sale_price, lease_price, images[])
   - renderDetail() force-fetches from API if local cache is stale

2. No images — 8 seed properties with real Unsplash photos ✅ (live now)

3. Data not showing
   - API URL updated to: geoestate-api-clpa.onrender.com (all files)
   - Red banner on all pages when API is unreachable

4. Owner dashboard
   - Property cards clickable → full detail modal
   - Image upload button (Cloudinary) on Add Property form
   - /owner/property/:id/detail endpoint

5. Sales portal — API banner + detail modal works with full data

6. Cloudinary upload integrated on:
   - Website listing form (multi-photo)
   - Admin property edit form
   - Owner add property form

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVE TEST PROPERTIES (already in DB)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SEED-001  3 Bed Flat, Lekki Phase 1          RENT  ₦1.8M/yr
  SEED-002  5 Bed Duplex, Maitama Abuja        RENT  ₦6M/yr
  SEED-003  2 Bed Luxury Apt, Victoria Island  BUY   ₦85M
  SEED-004  4 Bed Terrace, Jabi Abuja          RENT  ₦3.5M/yr
  SEED-005  Prime Land 600sqm, Ibeju-Lekki     BUY   ₦15M
  SEED-006  1 Bed Mini Flat, Surulere Lagos    RENT  ₦650k/yr
  SEED-007  3 Bed Bungalow, Bodija GRA Ibadan  LEASE ₦2.4M
  SEED-008  Commercial Plaza, Allen Ave Ikeja  LEASE ₦12M/yr
