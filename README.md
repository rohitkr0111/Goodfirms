# Goodfirms directory

Next.js directory prototype for discovering digital marketing agencies by city, service, rating, and budget.

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and set a private `ADMIN_SECRET`.
3. Run `npm install`, then `npm run dev`.
4. Open `http://localhost:3000`; open `/admin` to manage sample agency listings.

The first request initializes `data/agencies.json` from the sample data. Admin edits persist in that file and public pages read the same store. Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin so canonical metadata, robots, and sitemap URLs are correct.

## Current implementation

Includes responsive public pages, filterable listings, agency profiles with JSON-LD, dynamic country/city and service routes, metadata, sitemap and robots routes, a listing submission contact page, and a local listing admin/API.

This is a runnable prototype. The local JSON store is intended for a single Node server and is not suitable for serverless multi-instance production. Production deployment needs persistent database and image storage, a real identity provider/session authorization, review moderation, and an integrated permitted business-data provider. Sample agencies and contact details are demo content.
