# Content Dashboard (Monorepo)

A full-stack TypeScript content dashboard built with:

- Node.js + Express (API)
- React + TypeScript + Vite (Web)
- TanStack Query (Server state management)
- Vitest + Testing Library (Unit & Integration Tests)
- Monorepo (npm workspaces)
- GitHub Actions (CI)

This sample is designed to demonstrate production-oriented React architecture, end-to-end type safety, and backend layering.

---

## Architecture

```
content-dashboard/
├── apps/
│   ├── api/        # Express API (pagination + filtering)
│   └── web/        # React frontend (feature-based structure)
├── packages/
│   └── shared/     # Shared TypeScript contracts
├── .github/
│   └── workflows/  # CI pipeline
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

## API Usage

The API exposes a paginated and searchable endpoint:

### Endpoint

Response types are defined in the shared TypeScript contract located in `packages/shared`.

```
GET /api/content
```

### Query Parameters

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| page      | number | Page number (default: 1)        |
| limit     | number | Items per page (default: 10)    |
| search    | string | Optional search filter by title |

### Example Request

```
curl "http://localhost:4000/api/content?page=1&limit=5&search=Article"
```

### Example Response

```
{
  "data": [
    {
      "id": "uuid",
      "title": "Article 1",
      "body": "Content body",
      "author": "Author 1",
      "createdAt": "2026-02-16T12:00:00.000Z"
    }
  ],
  "total": 120,
  "page": 1,
  "totalPages": 24
}
```

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
