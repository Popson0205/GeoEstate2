GeoEstate FINAL mobile correction

Replace ONLY these two files in:
GeoEstate2/

- index.html
- geoestate-theme.css

Important:
- The CSS version in index.html has been changed from ?v=2 to ?v=3 to force the browser/CDN to fetch the corrected stylesheet.
- The experimental geoestate-mobile-repair.js is no longer loaded and can be removed.
- The original full 1,559-line geoestate-theme.css has been restored, then the final mobile fixes were appended.

Fixes:
1. Main mobile hamburger (#geo-hamburger) is explicitly visible.
2. Desktop portals hamburger is hidden on mobile.
3. Mobile navigation uses the existing toggleMobileNav() implementation.
4. Mobile map page parent changes from horizontal flex to vertical.
5. Map sidebar and map receive real mobile heights.
6. Leaflet map gets the full available width/height instead of being squeezed to zero width.
7. CSS cache is busted with geoestate-theme.css?v=3.
