# Mercedes-AMG F1 Team Website

![App Preview](https://imgix.cosmicjs.com/0ef747c0-bb84-11f1-9cda-bfce924e4efc-CleanShot-2026-09-28-at-14-31-492x.png?w=1200&h=630&fit=crop&auto=format,compress)

A premium, editorial-style Formula 1 team website built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Styled after mercedesamgf1.com with a black canvas, Petronas teal accents, and full-bleed cinematic imagery.

## Features

- 🎠 Full-width hero carousel with peek-preview neighboring slides, pulled from News
- ⏱️ Live countdown to the next race (days/hrs/mins/secs)
- 📰 News grid + rich article detail pages
- 🏁 Race calendar styled like an F1 schedule + race detail pages
- 🏎️ Car technology feature section + car detail pages
- 👤 Driver/Team portrait cards + individual profile pages
- 🤝 Partner logo strip + partner detail pages
- 📱 Responsive design with slide-out mobile navigation
- ⚡ Server Components for fast, SEO-friendly rendering

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6abadb0f11130669816b65ee&clone_repository=6abadf0e11130669816b66c1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> A Formula 1 team website styled like https://www.mercedesamgf1.com (see reference screenshot). Use the existing Cosmic content types: News (seo_title, seo_description, featured_image, published_at, content), Races, Cars, Teams (drivers/team members), and Partners (each with seo_description, featured_image, content). Premium motorsport look with pure black background, white text, Petronas teal accents, neon green pill for active states, bold condensed uppercase headings, generous whitespace, large full-bleed imagery with rounded-corner cards. Two-tier black header with stacked team logo mark, utility row, main nav with dropdown chevrons, teal underline. Sub-bar with pill tabs, ticker, live clock. Homepage with hero carousel, next race countdown, latest stories grid, our car feature, our drivers section, partners strip, and footer. Individual pages for news, races, cars, team and partners with grid and detail views. Fully responsive with mobile slide-out menu and smooth hover transitions.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) — App Router, Server Components
- [Cosmic](https://www.cosmicjs.com) — Headless CMS
- TypeScript — Strict typing throughout
- Tailwind CSS — Utility-first styling + Typography plugin
- Bun — Package management & runtime

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Cosmic account with this bucket connected

### Installation

```bash
bun install
```

Create your environment variables (see Environment Variables section below), then run:

```bash
bun run dev
```

Visit `http://localhost:3000`.

## Cosmic SDK Examples

```typescript
// Fetch all news articles, sorted newest first
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'news' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

```typescript
// Fetch a single race by slug
const response = await cosmic.objects
  .findOne({ type: 'race', slug: 'monaco-grand-prix' })
  .depth(1)
```

## Cosmic CMS Integration

This app uses five Cosmic object types straight out of your bucket:

| Type | Slug | Key Metafields |
|---|---|---|
| News | `news` | seo_title, seo_description, featured_image, published_at, content |
| Races | `race` | seo_description, featured_image, content |
| Cars | `car` | seo_description, featured_image, content |
| Team | `team` | seo_description, featured_image, content |
| Partners | `partner` | seo_description, featured_image, content |

All content reads happen server-side via Server Components using `lib/cosmic.ts`, keeping your API keys secure.

## Deployment Options

### Vercel
1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variables below in Project Settings → Environment Variables
4. Deploy

### Netlify
1. Push this repo to GitHub
2. Import the project in [Netlify](https://netlify.com), framework preset: Next.js
3. Add the environment variables below in Site Settings → Environment Variables
4. Deploy

Required environment variables (set in your hosting dashboard):
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->