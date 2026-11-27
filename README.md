# Deal Beacon — Real Black Friday Deals 2026

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/gibalers-rgb/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/gibalers-rgb/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

A Black Friday deal finder with real, checked prices: 39 deals at Amazon, Best Buy, Target and Walmart, each with its product, store, sale price, usual price, discount, store link, check time and source — plus an honest verdict on whether it is really a deal (new low, strong deal, or routine sale).

## What it is

- **Search that works** — type a product, store or brand.
- **Filters that work** — category, store, minimum discount, and verdict.
- **Sorting** — best verdict first, biggest discount %, biggest dollar saving, lowest or highest price.
- **Same product, two stores** — where a product is on sale twice (AirPods Pro 3, MacBook Air M5), both listings show so you can compare.
- **Honest signals** — a NEW LOW is the lowest price the cited source has ever tracked; STRONG is a deep cut; ROUTINE is a real but small discount, called out as such instead of hyped.

## How the deals were checked

Every deal was found and checked on **27 Nov 2026 (Black Friday)** by reading the price in a deals roundup that names its store (9to5Mac, MacRumors, 9to5Google, 9to5Toys, Best Buy's own Black Friday release, Benzinga, UltraGamerZ, FlashDealFeed, CNN Underscored, ComicBook, Yahoo Shopping). Sale and usual prices are exactly what the source reported; the discount % is computed from the two prices, so the numbers always add up. Store links open the store's own search page for that product.

## Run it

The site is plain static files under `app/` with no build step. Serve `app/` with any static server and open `index.html` — it works in desktop Chrome and on a phone, with no network request.

```sh
# from the repository root
python3 -m http.server --directory app 8080
# then open http://localhost:8080
```

## Hand in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` (or `$MAKEFUN_OUTPUT_DIR`) and writes `output/dossier.json` with the vendored make.fun library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `main.ts` — the hand-in program
- `app/index.html` — the page
- `app/style.css` — the look
- `app/deals.js` — the 39 checked deals
- `app/filters.js` — filtering, sorting and summary math
- `app/render.js` — deal cards and stats
- `app/app.js` — wiring the controls to the grid
- `screenshots/` — real renders of the site
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged

MIT licensed. Not affiliated with any store named here.
