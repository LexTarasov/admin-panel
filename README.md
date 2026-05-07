# Admin Panel

A full-stack admin dashboard built with React + Xano for backend — a personal project to sharpen my React skills by building something real end-to-end, then polishing the UI with Claude Code.

## What it does

- **Authentication** — sign up / sign in with JWT, session persisted in `localStorage` and validated on every load
- **Products** — full CRUD: create, edit, delete, and view inventory with stock and status tracking
- **Users** — manage user roles (Admin / User) and active status, Admin-only access
- **Analytics** — visual breakdowns of products by category, users by role, and active vs inactive users via Recharts
- **Role-based routing** — the `/users` route is restricted to Admin accounts

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 19, Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP | Axios with Bearer token interceptor |
| Charts | Recharts |
| Backend | Xano (REST API) |
| Build | Vite |

## How I built it

I built this project in two stages:

**Stage 1 — Core logic (me):** I designed and implemented the full application from scratch — auth context, data context, protected routing, CRUD operations, API integration with Xano, and all page logic.

**Stage 2 — UI polish (with Claude Code):** Once the app was fully functional, I used Claude Code to improve the visual layer: redesigned the layout to be true full-screen, rebuilt the sidebar with a dark theme and icons, standardized the color palette, and translated all UI text to English.

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.
