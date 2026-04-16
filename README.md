# Applied AI Engineer Studio

A static Next.js learning platform for a 30-lesson applied AI curriculum.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- MDX via `next-mdx-remote`
- Browser-local progress via `localStorage`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Notes

- Progress is stored in the visitor's browser and does not sync across devices.
- GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`.
