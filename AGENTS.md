# AGENTS.md

Standing instructions for Codex sessions maintaining **The Threshold**.

## Project Purpose

The Threshold is an unofficial fan research archive and field-dispatch site about filmmaker and musician Kane Parsons, also known as Kane Pixels. It is a source-driven archive first and a publication second: preserve evidence, visible uncertainty, and dated editorial decisions before writing dispatch prose.

The project is not affiliated with Kane Parsons, A24, Valve, Async Research Institute, or their partners. Keep that disclaimer visible in generated pages.

## Current Archive State

- The archive begins with **Edition 001**.
- Do not create routes, redirects, placeholders, migration entries, or archive references for Editions 007 or 008.
- `src/_data/editions/001.json` is intentionally in `review` status until explicitly approved for publication.
- Do not begin Edition 002 unless the user explicitly asks.
- Published history must not be silently rewritten. Use dated corrections.

## Source Of Truth

The connected repository is authoritative. Read the current files before making broad changes.

Primary files and directories:

- `src/_data/sources.json` - canonical source registry.
- `src/_data/timeline.json` - dated evidence ledger.
- `src/_data/research-queue.json` - unresolved questions and blocked evidence.
- `src/_data/editions/*.json` - structured dispatch content.
- `schemas/*.schema.json` - JSON Schema contracts.
- `scripts/validate-data.mjs` - schema and cross-reference validation.
- `src/_includes/` - shared Nunjucks layouts and components.
- `src/assets/css/` and `src/assets/js/site.js` - visual system and progressive enhancement.
- `.github/workflows/deploy-pages.yml` - GitHub Pages deployment.

## Permitted Technology

Keep the site static and portable:

- Eleventy/11ty
- Nunjucks
- JSON data
- JSON Schema validation with Ajv
- Vanilla CSS
- Minimal progressive-enhancement JavaScript
- GitHub Actions
- GitHub Pages

Do not introduce React, Next.js, a database, authentication, a CMS, server-side functions, or hosted font dependencies unless the user explicitly requests a scope change.

## Editorial Classifications

Use verification status separately from confidence.

Timeline status values are:

- `confirmed`
- `reported`
- `partially-confirmed`
- `inferred`
- `rumor`
- `disputed`
- `unsupported`
- `false`
- `retracted`
- `unknown`

Confidence values are `high`, `medium`, and `low`.

Dispatch story labels may combine editorial language such as `Signal // reported` or `Confirmed // details vary`, but the underlying timeline data must remain precise.

## Claim Verification Rules

For meaningful claims, identify:

- Who originally made the claim.
- When it was made.
- Whether the original source is available.
- Whether the wording is stronger than the source.
- Whether later reporting independently confirms it or repeats one chain.
- Whether the event date differs from the publication date.
- Whether the claim is fact, interpretation, marketing language, or fan inference.

Never turn visits, follows, likes, jokes, color choices, suggestive imagery, or playlist presence into project confirmation. A Valve visit may be a confirmed or reported visit without proving its purpose. A Portal-colored image may fuel speculation without confirming a Portal film.

Uncertain claims must remain visibly uncertain. If a source cannot be accessed or verified, preserve the uncertainty and add or keep a research-queue item rather than pretending it was reviewed.

Do not fabricate citations, quotes, dates, URLs, Discord content, interviews, screenshots, or source metadata.

## Source Registry And Timeline Relationships

Every source used by public pages should live in `src/_data/sources.json` and be referenced by ID.

Every timeline event should reference existing source IDs. Confirmed timeline events must have supporting sources. Edition timeline highlights must reference existing timeline IDs.

A new news item should generally enter the source registry and timeline before an edition cites it. Avoid duplicating full source metadata inside edition JSON.

Source tiers:

- `primary`
- `authoritative-secondary`
- `secondary`
- `community`
- `unverified`

Community material is a lead, not automatic confirmation.

## Corrections Policy

Published editions are historically stable. To fix a published error:

- Add a dated correction object to the edition.
- Update the underlying source or timeline data.
- Update `CHANGELOG.md`.
- Preserve the original publication date.
- Explain whether the original claim was false, overstated, premature, or superseded.

Draft and review editions may be revised before publication, but do not materially rewrite Edition 001 during onboarding or maintenance unless the user asks or a validation/rendering problem requires it.

## Visual And Accessibility Constraints

Preserve the field-memo visual identity:

- Dark outer field.
- Pale dispatch document.
- Red stamps and classification marks.
- Technical memo hierarchy.
- Tracking strip, registration marks, file numbers, dated metadata, and source annotations.

Core CSS tokens include:

- `--field: #15191e`
- `--paper: #c9ccc4`
- `--stamp: #b5322a`

Keep readability ahead of effects. Maintain semantic HTML, strong focus states, reasonable contrast, responsive layouts, reduced-motion handling, print styles, and functionality without JavaScript. Do not copy proprietary A24, Valve, Portal, or Async Research Institute assets.

## Validation Requirements

The build should fail for issues such as:

- Missing referenced source IDs.
- Missing referenced timeline IDs.
- Duplicate edition numbers.
- Invalid status or confidence values.
- Malformed JSON.
- Confirmed events without supporting sources.
- Published editions without publication dates.
- Corrections without dates.
- Required source records without titles.
- Missing source URLs without explanatory notes.

Do not loosen validation to make bad data pass.

## Development Commands

Use standard Node.js tooling:

```bash
npm install
npm run validate
npm run build
npm run dev
npm run check:links
```

`npm run build` writes the generated site to `dist/`.

`npm run check:links` writes `reports/link-check.json`; external link failures are warnings for manual review and should not remove historical sources by themselves.

## Deployment

GitHub Pages deployment is defined in `.github/workflows/deploy-pages.yml`.

The workflow should:

- Trigger from `main` and manual dispatch.
- Use the committed lockfile with `npm ci`.
- Run validation before production build.
- Build `dist/` with the correct `PATH_PREFIX`.
- Upload `dist/` using the official Pages artifact action.
- Deploy through GitHub Pages with `pages: write` and `id-token: write`.

Do not commit generated `dist/` output unless the repository intentionally changes deployment strategy.

## Git And Pull Requests

- Work on a branch such as `codex/repository-onboarding`; do not commit directly to `main`.
- Keep changes small and reviewable.
- Avoid unnecessary dependency upgrades, wholesale formatting rewrites, redesigns, or unrelated refactors.
- Run validation and build before committing when dependencies are available.
- In the final report, list changed files, commands run, command results, build output, editorial impact, deployment assessment, and remaining issues.

## Editorial Guardrails For Edition 001

Edition 001 may receive technical fixes such as malformed data, broken source references, schema violations, rendering bugs, inaccessible markup, obvious typos, or inaccurate internal labels caused by technical mistakes.

Do not strengthen, weaken, remove, or reclassify a factual claim without documenting the original wording or classification, the proposed change, supporting evidence, and why the change is necessary.
