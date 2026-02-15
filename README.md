# Content Dashboard (Monorepo)

A full-stack TypeScript content dashboard built with:

- Node.js + Express (API)
- React + TypeScript + Vite (Web)
- TanStack Query (Server state management)
- Vitest + Testing Library (Unit & Integration Tests)
- Monorepo (npm workspaces)
- GitHub Actions (CI)

---

## Architecture

```
content-dashboard/
├── apps/
│ ├── api/ # Express API (pagination + filtering)
│ └── web/ # React frontend (feature-based structure)
├── packages/
│ └── shared/ # Shared type contracts
├── .github/
│ └── workflows/ # CI pipeline
└── README.md
```

### Key Concepts

- Feature-based frontend architecture
- Shared type contracts between client & server
- Server-state management with React Query v5
- Debounced search + pagination
- Hook-level and UI integration testing
- CI validation (type-check, build, test)

---

## Getting Started

### Install dependencies

```
npm install
```

### Run API

```
npm run dev -w api
```

### Run Web

```
npm run dev -w web
```

---

## Testing

```
npm run test -w web
```

---

## CI

GitHub Actions runs:

- Type checking
- Tests
- API build
- Web build
