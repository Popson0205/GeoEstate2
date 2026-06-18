GeoEstate — Property Detail Bug Fixes
======================================
Date: June 2026

DEPLOYMENT INSTRUCTIONS
-----------------------

STEP 1 — GeoEstate repo (backend):
  Replace: server.js

STEP 2 — GeoEstate2 repo (frontend):
  Replace: index.html
  Replace: owner-dashboard.html
  (sales.html and geo-api.js are included for reference — no changes needed)

STEP 3 — Seed real images (run ONCE after backend deploys):
  curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
    https://geoestate.onrender.com/admin/seed-images

WHAT WAS FIXED
--------------
1. Property detail page was blank — backend SQL queries for /properties/:id
   and /owner/properties were missing bedrooms, bathrooms, size_sqm,
   description, amenities, monthly_rent, sale_price, images columns.
   All 3 routes now return full detail fields.

2. No images on properties — all 13 live properties had empty img field.
   The /admin/seed-images endpoint seeds them with real Nigerian property
   images (Unsplash) plus realistic addresses, descriptions and amenities.

3. Owner dashboard — property cards are now clickable and show a full
   detail modal with image, price, beds/baths, description and amenities.
   A new /owner/property/:id/detail backend endpoint supports this.
