# The Threshold

A source-driven static research archive and field dispatch covering Kane Parsons (Kane Pixels). The project separates confirmed facts, reported information, interpretation, signals, rumors, and unresolved questions.

> **Unofficial fan project.** This repository is not affiliated with Kane Parsons, A24, Valve, Async Research Institute, or their partners.

## Current state

This repository establishes the publication system, seeds the research database through **July 5, 2026**, and begins the archive cleanly with **Edition 001**.

Edition 001 is a complete native structured dispatch in `review` status. Its content is generated from the source registry and timeline rather than maintained as duplicated standalone HTML. Assign a publication date and change its status to `published` only after reviewing the generated page.

## Stack

- Eleventy 3
- Nunjucks
- JSON data
- Vanilla CSS and JavaScript
- Ajv JSON Schema validation
- GitHub Actions and GitHub Pages

## Local development

```bash
npm install
npm run validate
npm run dev
```

Production build:

```bash
npm run build
```

The generated site is written to `dist/`.

Optional external-link audit:

```bash
npm run check:links
```

This creates `reports/link-check.json`. Link failures are reported for manual review and do not fail the build.

## Publish Edition 001

Review `dist/dispatch/001/index.html`, then edit `src/_data/editions/001.json`:

```json
{
  "publishedDate": "2026-07-05",
  "status": "published"
}
```

Run `npm run build` again and commit the resulting source changes. Published editions should receive dated corrections rather than silent historical rewrites.

## Create the next edition

```bash
npm run new:edition -- 002 "Edition headline"
```

Add sources and timeline events before drafting the edition, run validation, and review the generated page.

## GitHub Pages

The included workflow builds and deploys `dist/` whenever `main` is pushed. In the repository settings:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push this repository to `main`.

The workflow uses the repository name as the Pages path prefix. For a custom domain or user/organization root site, set `PATH_PREFIX` to `/` in the workflow.

## Important files

- `docs/PROJECT_CHARTER.md` — standing editorial and engineering rules
- `INITIAL_BUILD_REPORT.md` — what the first repository pass created and verified
- `src/_data/sources.json` — canonical source registry
- `src/_data/timeline.json` — dated evidence ledger
- `src/_data/research-queue.json` — unresolved questions
- `src/_data/editions/001.json` — the first dispatch
- `scripts/validate-data.mjs` — schema and reference validation

## Editorial rule

A news item enters the source registry and timeline before an edition cites it. Published editions are historically stable; corrections are dated and recorded rather than silently overwritten.
