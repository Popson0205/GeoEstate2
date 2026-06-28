# GeoEstate — Full Form Rewrite (v3)
Date: June 2026

## Files
- index.html  → GeoEstate2 repo root
- server.js   → GeoEstate repo root

## What changed

All form logic was rewritten from scratch (not patched).
Four blocks replaced in index.html:

### 1. Early script block (~line 354)
Hoisted closeMobileNav() and openAuthModal() stubs.
These must exist before the full JS parses so nav button
onclick handlers never hit ReferenceError on fast clicks.

### 2. submitVerification block (~line 2867)
Full rewrite of submitVerification(). Clean field reads,
proper validation, Supabase uploads (non-fatal), correct
owner token format (owner:<id>:<timestamp>), error/progress
state properly reset on retry. verifySuccess() kept as alias.

### 3. Auth system block (~line 3108)
Complete rewrite of all auth functions:
  - initAuth()          — restore session from localStorage
  - loginSuccess()      — set session + update banner
  - logoutUser()        — clear session, redirect home
  - renderNavAuth()     — show user pill or Sign In/Register buttons
  - openAuthModal()     — full def (replaces hoisted stub)
  - closeAuthModal()
  - toggleDropdown() / closeDropdown()
  - switchAuthTab()
  - selectRole()
  - checkPassStrength() / togglePassVis()
  - showAuthToast()     — self-creating toast div, no missing element dep
  - startOTPTimer()     — proper countdown with clearInterval
  - geoHandleFileSelect() — file picker feedback
  - geoUploadToSupabase() — clean fetch with proper error messages
  - doRegister()        — validate → pendingRegData → sendOTP
  - sendOTP()           — POST /send-otp, handle testMode devCode
  - otpNext() / otpBack()
  - verifyOTP()         — verify OTP → POST /register → use
                          regData.submissionId → loginSuccess → /verify page
  - doLogin()           — POST /user/login → loginSuccess

### 4. Mobile nav block (~line 5389)
toggleMobileNav, closeMobileNav, navTo rewritten as one clean block.
closeMobileNav() extracted so buttons can call it directly.

### server.js
- /register returns submissionId even on "Already registered"
- URL trailing slash stripped before route matching
- Supabase error details logged to Railway console

## Key fixes carried through
- verifyOTP now uses regData.submissionId returned from server
  so /owner/verify-identity always gets the real DB row ID
- showAuthToast() creates its own DOM element — never fails from
  a missing element in the page
- All API calls use GEO_API_BASE constant

## Still needed (env vars on Railway)
  SUPABASE_URL         = https://<project>.supabase.co
  SUPABASE_SERVICE_KEY = <service_role key>
  SUPABASE_BUCKET      = geoestate-docs   (optional, default)
  Bucket must exist in Supabase Storage and be set to public.

## Deploy order
  1. Push server.js to GeoEstate repo (Render auto-deploys)
  2. Push index.html to GeoEstate2 repo
