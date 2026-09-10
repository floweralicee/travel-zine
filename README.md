# Somewhere, lately

A tactile travel scrapbook for Alice. Built with React, Vinext, Cloudflare D1 and R2.

## Working features
- Responsive open-book journal with animated navigation, swipe and keyboard controls.
- Separate entries and dated city/state stamps for every visit, including return trips.
- Persistent entries in D1; original photo and drawing uploads in R2.
- Photo EXIF date/GPS extraction; nearby previously recorded locations suggest a city. New locations require confirmation. Photos without metadata are entered manually.
- Bucket-list inspiration photos and notes, convertible to completed visits.
- Original drawing scans retained, with full-size viewing.
- Clearly labeled illustrative entries when the journal is empty. Demo entries are never saved unless explicitly edited and saved.

## Not connected yet
Automatic Apple Photos/iCloud album sync, an inbound SMS number, reverse geocoding for new cities, and image-to-3D city trophy generation need external integrations. No buttons imply these are connected. Photo picker uploads work on phones; HEIC should first be exported as JPEG. Multiple dates/cities in one upload should be split into separate entries manually.

The hosted site is owner-private. API access relies on the hosting access gate. Add application-level identity and ownership checks before any public/multiuser deployment. Uploaded content remains private to the hosted site; Git contains only example assets and source.

## Develop
Use the declared pnpm version. Install with `pnpm install`, run `pnpm dev`, generate migrations with `pnpm db:generate`, and build with `pnpm build`. D1 binding: DB. R2 binding: BUCKET. Migrations live in drizzle/.

## Example image credits
- Sedona: Anthony Melone, https://unsplash.com/photos/YdzWGR7tvQk
- San Francisco: Tobias Pfeifer, https://unsplash.com/photos/DPem4k5atCI
- Kyoto: David Emrich, https://unsplash.com/photos/VCM99u6HltA
All under the Unsplash License. Example travel writing is fictional.
