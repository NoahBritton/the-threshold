# Initial Build Report

**Pass date:** July 5, 2026  
**Repository version:** 0.2.0  
**First dispatch:** Edition 001 — *The Door Is Not Confirmation*

## Result

The Threshold is a working Eleventy static-site repository with reusable Nunjucks templates, structured research data, validation, a production build, and GitHub Pages deployment. The archive begins at Edition 001; no earlier edition numbers are reserved or implied.

Edition 001 is fully populated and marked `review`. This allows visual and editorial inspection without treating the generated draft as already published.

## Files and systems created

- Complete Eleventy project and package configuration
- Shared base and dispatch layouts
- Reusable masthead, story, source, confidence, correction, watch-file, and timeline components
- Home, archive, timeline, research-status, methodology, dispatch, and 404 templates
- Canonical source, timeline, research-queue, site, and edition data
- JSON Schemas and cross-reference validation
- Link-audit and new-edition scripts
- GitHub Pages deployment workflow
- Responsive, print, and reduced-motion CSS
- Project charter, README, contributing guide, changelog, research log, and build report

## Edition 001 editorial structure

- Lead: why a signal is not an announcement
- Portal interest and Valve-visit evidence
- Backrooms crossing $300 million worldwide
- Everything Must Go Edition release and runtime discrepancy
- A24/Google DeepMind partnership and the unproven scope around Backrooms
- Backrooms sequel development status
- Timeline extract
- Active watch file
- Full edition source ledger

## Research classifications

### Confirmed

- A24 and Google DeepMind announced a research partnership on June 22, 2026.
- Backrooms crossed $300 million worldwide by June 21, becoming the first A24 release to pass that threshold globally.
- Everything Must Go Edition opened July 3; an exhibitor listing describes post-credit bonus footage.

### Reported

- Kyle Buchanan says Parsons was exploring a Portal film with caution and curiosity when asked in early May.
- Parsons posted imagery from Valve headquarters; the purpose was not established.
- A Backrooms sequel was in early development as of June 1.
- Parsons criticized generative AI in creative work.
- Parsons reportedly said A24/DeepMind resources were not to be spent on Backrooms.
- A September 4 Japanese release was announced, pending capture of the canonical distributor post.

### Preserved uncertainty

- Valve has not confirmed a Portal film.
- No reviewed source proves why Parsons visited Valve or that he visited repeatedly over a week.
- The teal/orange mural or technical-drawing post has not yet been captured in canonical form.
- Everything Must Go listings vary between 15 and 16 bonus minutes and between 126 and 127 minutes total.
- The A24/DeepMind announcement names no specific film.
- Early sequel development is not a release plan.
- The current production status of People Still Live Here remains unresolved.

## Validation and build

Run:

```bash
npm ci
npm run validate
npm run build
```

The generated site is written to `dist/`. The GitHub Actions workflow runs the same validation and build before deploying to GitHub Pages.

## Before public launch

1. Open and proofread `dist/dispatch/001/index.html`.
2. Replace placeholder values in `src/_data/site.json` with the real repository and public site URLs.
3. Decide the Edition 001 publication date.
4. Change Edition 001 from `review` to `published`.
5. Run the production build again.
6. Push to GitHub with Pages configured to use GitHub Actions.
