# Somewhere, lately

A tactile travel scrapbook for Alice, built with React, Vinext, Cloudflare D1 and R2.

The repository originally contained only this README. The application source has now been restored as a new implementation in `app-source/`; no previous application code or production data was available in this checkout.

## Implemented

- Responsive paper-book journal with animated entry turns, swipe and keyboard navigation.
- Separate records and dated city/state stamps for each visit, including return trips.
- Journal editing and durable storage through D1; original images and drawing scans stored in R2.
- Uploads from a phone photo picker or camera exports, with editable captions and full-size viewing.
- EXIF date/GPS extraction, nearby known-city suggestions within 20 km, and a review queue that groups mixed photos by capture day and GPS. Confirm all suggestions before saving.
- A Someday collection for bucket-list images/screenshots and notes. “I made it here” converts a saved destination into a dated visit.
- A keepsake shelf with dimensional photo cards and a drawing collection. These are not generated 3D city models.
- Notes/metadata JSON export. Uploaded image bytes are not included in that export.
- Clearly labeled example entries with fictional travel writing. Examples are not saved until explicitly edited and saved.
- Save failures leave the open draft intact. Browser-only authoritative storage is not used.

## Still to connect / build

- Automatic Apple Photos/iCloud album sync: currently use the browser photo picker.
- An inbound SMS/MMS number: requires a messaging provider and a verified sender/owner mapping.
- Reverse geocoding for new cities: EXIF-assisted imports suggest known cities; new locations require manual city/region confirmation. Photo-group review splits batches by capture day and nearby GPS location; review every group before saving, and keep multi-day trips together when appropriate.
- Screenshot-to-3D city models: requires a generation service and asset storage. Current keepsakes use the visit photograph.
- HEIC/RAW conversion: export JPEG before upload. JPEG, PNG, and WebP are accepted, up to 20 MB per image.
- Cross-device draft recovery, entry deletion and orphan-upload cleanup.

## Develop

```sh
cd app-source
pnpm install
pnpm dev
pnpm db:generate
pnpm build
```

Use the declared pnpm version. `app-source/.openai/hosting.json` declares D1 `DB` and R2 `BUCKET`; migrations are in `app-source/drizzle/`. Apply migrations and provision the bindings before live saves. The source is build-verified but has not been published from this checkout.

## Access boundary

This is a single-owner application designed for an owner-private Sites deployment. API reads and writes depend on that outer access gate, with same-origin checks on mutations. Do not deploy it to a public origin without adding application-level authentication and record ownership checks. Git contains only source and licensed example imagery, never personal uploads or credentials.

## Example photo credits

All under the [Unsplash License](https://unsplash.com/license):

- [Sedona — Anthony Melone](https://unsplash.com/photos/brown-rock-formation-under-blue-sky-during-daytime-ut9T19ipAPA)
- [San Francisco — Braden Collum](https://unsplash.com/photos/white-house-tsYlX1DSjn4)
- [Kyoto — David Emrich](https://unsplash.com/photos/low-angle-photography-of-red-pagoda-house-WyKmY-op2xw)
