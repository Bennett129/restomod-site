# Altwerk Motors — animated marketing site with a CMS

A landing page for a fictional workshop that restores 2007–2013 E92 coupes, with scroll animations, a pricing toggle, dark mode and a blog the client can edit themselves.

**Stack:** Next.js 16 (App Router), Tailwind CSS, Motion, Sanity (Studio embedded at `/studio`), next-themes.

## Features

- Hero with scroll-linked parallax and a word-by-word headline reveal
- Count-up figures, a pinned "build" sequence that cross-fades as you scroll, staggered gallery
- Pricing with an animated Buy outright / Finance monthly toggle
- Light and dark themes; all animation respects the "reduce motion" setting
- Journal (blog), pricing packages and the home page headline are editable in Sanity
- A Sanity webhook refreshes the site within seconds of pressing Publish

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without a Sanity project the site uses the sample content in `src/content/cms-fallback.ts`, so it runs with no accounts.

## Connect Sanity

1. Create a project at https://www.sanity.io/manage.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In the project's API settings, add the site address as a CORS origin with credentials allowed.
4. Optional: add an Editor token as `SANITY_WRITE_TOKEN` and run `npm run sanity:seed` to upload the sample content.
5. Open `/studio` to edit.
6. For instant updates, add a webhook to `POST /api/revalidate` with the header `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`.

## Where things are

- `src/components/sections/`: one file per page section
- `src/content/site.ts`: fixed copy and image list
- `src/sanity/`: schemas, queries and the sample-content fallback

## Notes

Altwerk Motors is fictional and is not affiliated with BMW AG; the name is used only to describe the cars. Photos are hotlinked from Unsplash under the Unsplash licence and credited in the footer. Replace them with your own before using this commercially.
