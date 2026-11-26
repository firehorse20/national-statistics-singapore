# Singapore in Numbers

[![Bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/firehorse20/national-statistics-singapore/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/firehorse20/national-statistics-singapore/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A single-country national statistics site for **Singapore**: population,
economy, prices, labour, housing and health on eight linked pages, with
hand-drawn SVG charts, year-range selectors, chart/table toggles and unit
toggles. Every figure is real, carries its source and as-of date, and was
checked against official publications (Department of Statistics, MTI, MAS,
MOM, HDB, ICA, World Bank) on 26 November 2026.

## Run it

Serve `app/` with any static server and open `index.html`:

```sh
cd app && python3 -m http.server 8080
```

Or build the hand-in bundle (Node 22, standard library only):

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `app/` and `screenshots/` into `out/` and writes
`out/dossier.json`.

## Layout

- `app/index.html` — page shell and section navigation
- `app/main.js` — hash routing and control state
- `app/views.js` — one function per page
- `app/data.js` — every figure, with its source key
- `app/charts.js` — hand-written inline SVG charts (line, bar, dual-line, donut)
- `app/style.css` — the site's own design (system fonts only, no remote assets)
- `main.ts` — the hand-in program
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `screenshots/` — renders of the site taken by its maker

## Licence

MIT — see `LICENSE`.
