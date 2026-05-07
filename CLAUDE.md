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

**Auth flow:** `AuthContext` checks `localStorage` for `authToken` on mount, validates it via `/auth/me`, and sets `globalUser`. The axios instance in `src/utils/axios.js` automatically attaches the Bearer token from `localStorage` to every request via an interceptor.

**Context layer:**
- `AuthContext` (`src/context/Authcontext.jsx`) — session state, `globalUser`, `login`/`signup`/`logout`
- `DataContext` (`src/context/DataContext.jsx`) — `products` and `users` arrays, fetched once when `globalUser` is set; exposes `fetchProducts`/`fetchUsers` to trigger manual refreshes after mutations

**Routing & access control:** `App.jsx` renders three exclusive states based on `globalUser` and `isLoading`. Inside the authenticated shell, `ProtectedRoute` wraps routes — the `/users` route additionally requires `globalUser.role === "Admin"`.

**Product CRUD pattern (`src/pages/Products.jsx`):** local `showModal` state (`{ type, product }`) drives which modal variant renders (create / edit / delete). After any mutation, call `fetchProducts()` from `DataContext` to sync the list.

**Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`). Design language uses `slate-*` neutrals, `indigo-600` as the primary action color, and `rounded-2xl` / `shadow-sm` card style consistently across pages.
