# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Architecture

**Stack:** React 19, Vite, Tailwind CSS v4, React Router v7, Axios, Recharts.

**Backend:** Xano REST API at `https://x8ki-letl-twmt.n7.xano.io`. Two API namespaces:
- `/api:p6ipo4ad/` — auth endpoints (signup, login, me)
- `/api:HQaAbRYz/` — data endpoints (products, users)

**Auth flow:** `App.jsx` uses early returns: loading spinner → unauthenticated (auth form) → authenticated dashboard. `AuthContext` checks `localStorage` for `authToken` on mount, validates it via `/auth/me`, and sets `globalUser`. The axios instance in `src/utils/axios.js` automatically attaches the Bearer token via a request interceptor.

**Context layer:**
- `AuthContext` (`src/context/Authcontext.jsx`) — session state, `globalUser`, `login`/`signup`/`logout`
- `DataContext` (`src/context/DataContext.jsx`) — `products` and `users` arrays, fetched once when `globalUser` is set; exposes `fetchProducts`/`fetchUsers` to trigger manual refreshes after mutations

**Routing & access control:** Inside the authenticated shell, `ProtectedRoute` wraps routes — the `/users` route additionally requires `globalUser.role === "Admin"`.

**Product CRUD pattern (`src/pages/Products.jsx`):** local `showModal` state (`{ type, product }`) drives which modal variant renders (create / edit / delete). After any mutation, call `fetchProducts()` from `DataContext` to sync the list. Users follow the same pattern in `Users.jsx`.

**Layout:** Full-screen (`h-full w-full overflow-hidden` on `#root`). The sidebar is a fixed `w-60` column; `<main>` takes `flex-1 overflow-y-auto scrollbar-hide`. Each page manages its own padding and background — there is no centering wrapper in `App.jsx`.

**Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`). Color palette: `slate-900` sidebar, `slate-100` content background, `indigo-600` primary action color. Cards use `bg-white rounded-2xl shadow-sm border border-slate-200`. All UI text is in English; Spanish is reserved for inline code comments only.

**Scrollbar:** `.scrollbar-hide` utility defined in `src/index.css` hides the scrollbar visually while keeping scroll functional.
