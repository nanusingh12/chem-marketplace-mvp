# Chem Marketplace MVP (Bilingual - English & Persian)

## What this is
- Simple Next.js app (no login) that shows listings and allows creating listings.
- Bilingual UI (English + Persian) with a language toggle.
- Will use Supabase if you provide `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- If Supabase is NOT configured, the app runs using **localStorage + bundled mock data**, so you can test without any external services.

## Quick start (no Supabase)
1. Extract the ZIP.
2. Run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

## To connect Supabase later
- Create a Supabase project and a `listings` table (SQL provided in code).
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your Vercel or local `.env.local`.

