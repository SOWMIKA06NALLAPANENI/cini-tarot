# Cini Tarot

A tarot-card style movie and web series recommendation site. Answer a few playful questions and get two personalized picks, revealed as tarot cards.

## Folder structure

```
cini-tarot/
├── index.html              Main page (structure only)
├── css/
│   └── style.css           All styling: candy palette, glossy buttons, animations
├── js/
│   └── app.js               Quiz logic, scoring engine, catalog data, transitions
├── assets/
│   ├── images/              Posters, icons (added later)
│   └── character/           Spline character export goes here later
└── README.md
```

## Running it locally

Open with VS Code Live Server, or any local server. Opening `index.html` by
double-click also works since there's no build step, but Live Server gives
you auto-refresh while editing.

Keep all three files (`index.html`, `css/style.css`, `js/app.js`) together in
this same structure — the HTML references the CSS and JS by relative path.

## Current status

- Sign up screen (name + contact captured client-side only, no real backend yet)
- Home screen with greeting + start button
- 4-question quiz: mood, genre, occasion, time available
- Scoring engine matches answers against a hand-tagged catalog of 10 titles
- Reveal screen with two flippable tarot cards

## Not built yet

- Real authentication (planned: Supabase)
- Real movie/show data (planned: TMDB API via a Netlify Function)
- Real character asset (currently simple CSS placeholder shapes; planned: Spline)
- Saved reading history