# SWITCH MERCHANT — Admin Dashboard

Interactive design prototype of the Switch admin and merchant dashboard (Global Owner, Merchant Owner and other roles).

## Run

Serve the folder over HTTP and open `index.html` (the page loads `support.js` and the brand/chain images relatively, so it must not be opened from `file://`):

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open http://localhost:8080 (or the port shown).

## Contents

- `index.html` — the whole dashboard (template + logic + mock data in one file)
- `support.js` — runtime that renders the template
- `sw-select.js` — custom select component
- `brand/` — Switch logos
- `chains/` — network icons (Tron, Ethereum, Polygon, Base, BNB Chain, Arbitrum)

## Notes

- Fonts (Montserrat) and icons (Lucide) load from Google Fonts / unpkg, so an internet connection is needed.
- Navigation and role selection persist in `localStorage` under `swc2.*`.
- All data is mock data embedded in `index.html`; "today" in the prototype is Oct 06, 2026.
