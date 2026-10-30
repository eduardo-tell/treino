# AGENTS.md

This file provides guidance when working with code in this repository.

## What this is

openGym is a gym tracker that runs only in the browser. No API, no
Docker stack, no Capacitor / Android / iOS app. Training data lives in
`localStorage` (`gym_state_v1`); custom photos and videos live in IndexedDB.
License: AGPL-3.0-or-later. GitHub Pages serves the Vite production build.

## Project layout

```
frontend/  React 19 + Vite app (src/views, src/components, src/store, src/lib).
           `npm run dev` is the whole product. Builds to static files.
.github/   Pages deploy + frontend tests.
```

## Commands

```bash
cd frontend && npm install && npm run dev
cd frontend && npm test
cd frontend && npm run build
cd frontend && npm run preview
```

There is no linter/formatter configured. Match the existing style by hand.

## Architecture

### Frontend (`frontend/src`)

- **`store/useStore.js`** — Zustand store for the whole app state (`S`), persisted
  to `localStorage` (`gym_state_v1`). Boot stays local (no `/api/me`, no sync).
  `store/useUI.js` holds ephemeral UI (modals, rest timer).
- **`lib/`** — pure helpers with unit tests beside them: progression, 1RM,
  session read-back, recovery, workout model, exercise library.
- **`views/`** — one file per screen, routed from `App.jsx` with hash routing.
- Exercise stills/GIFs load from the public exercises-dataset CDN so no media
  server is required. UI language is Brazilian Portuguese (`pt-BR`).

Training-logic changes (progression, 1RM, session read-back) need a unit test in
`src/lib` beside the code.
