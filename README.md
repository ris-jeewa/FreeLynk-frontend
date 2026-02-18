# FreeLynk

A modern freelancer platform frontend focused on fair pricing, transparency, and better communication between freelancers and clients.

## Tech Stack

- **React 19** + **Vite 6**
- **Tailwind CSS 4** + **Ant Design**
- **React Router 7**
- **Auth**: WSO2 Identity Server (OAuth2/OIDC with PKCE)
- **Media**: Cloudinary (image uploads)
- **Payments**: Stripe (checkout)
- **HTTP**: Axios, React Hot Toast

## Prerequisites

- Node.js (v18+ recommended)
- npm or equivalent
- Running instance of WSO2 Identity Server (for auth)
- Backend API (default: `http://localhost:8080`)

## Getting Started

### Install dependencies

```bash
npm install
```

### Environment

Create a `.env` in the project root if you need to override defaults:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Auth is configured in `src/services/authis.js` (IDP host, redirect URI, client ID). Update those constants for your environment or move them to env variables.

### Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173` (or the port Vite shows).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── api/           # API client (axios instance, interceptors)
├── assets/        # Static assets and constants
├── components/    # Shared UI (Navbar, Layout, Sidebar, CloudinaryUploadWidget, etc.)
├── client/       # Client profile and related components
├── freelancer/   # Freelancer profile, skills, portfolio, about me
├── pages/        # Route pages (Home, AboutUs, Membership, Careers, PostProject, AdminDashboard, Checkout)
├── services/     # Auth (authis.js), user profile service
├── utils/        # Helpers (e.g. imageUtils)
├── App.jsx
├── main.jsx
└── index.css
```

## Features

- **Authentication**: Login/logout via WSO2 IS (PKCE), token refresh, callback handling
- **Profiles**: Freelancer and client profiles with bio, skills, portfolio, Cloudinary uploads
- **Project**: Post project form (UI; backend integration in progress)
- **Admin**: Admin dashboard structure
- **Payments**: Checkout flow with Stripe
- **UI**: Dark theme, responsive layout with Tailwind + Ant Design

## Roadmap

See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for the strategic roadmap, current state, and planned phases.

## License

Private project.
