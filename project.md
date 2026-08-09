Draft based on the workspace folders (`satva-connector-unified`, `satva-connector-ms`, `TestFolder`, `docs`). Copy/paste as needed.

---

### Overview

Zact is an ERP connector platform that syncs and creates accounting entities (vendors, accounts, classes/segments, bills, payments, journal entries, expenses) across QuickBooks Online, NetSuite, and Sage Intacct.

The workspace is split into:

| Folder | Role |
|--------|------|
| `satva-connector-unified` | Product surface: Angular webapp, Auth Gateway (OAuth), Unified Backend (CRUD, sync, Kafka, Prisma/MySQL) |
| `satva-connector-ms` | ERP microservices behind an API Gateway (per-entity services + Helm umbrella chart) |
| `TestFolder` | Live API research, evidence, and fixtures (not production) |
| `docs` | Cross-cutting reference (e.g. Kafka flows) |

Flow in short: app → Auth Gateway for ERP connect → Unified Backend for orchestration → Kafka for async create/sync → API Gateway / MS → ERP APIs.

---

### Architecture

```
Webapp (Angular)
    │
    ▼
Auth Gateway  ──OAuth──► QBO (Xero/NetSuite/QBD planned)
    │                    Separate K8s clusters (dev-auth / staging-auth)
    ▼
Unified Backend          Entity CRUD, sync, token storage, mappers
    │                    Kafka consumer/producer · Prisma/MySQL
    │                    Separate clusters (dev-unified / staging-unified)
    ▼
API Gateway + MS         account, vendor, class, bill, payment, JE, …
    │                    Helm umbrella chart · Docker/K8s
    ▼
ERP APIs                 QBO · NetSuite · Sage Intacct (service=…)
```

**Messaging:** request/response Kafka topics (`UNIFIED_*_CREATE_REQUEST` / `_RESPONSE`, sync topics, `UNIFIED_SYNC_NOW_REQUEST`) documented in `docs/KAFKA_IMPLEMENTATION.md`.

**Deploy:** independent Helm charts for auth vs unified; MS via `zact-umbrella-chart` with env bifurcation (dev/staging/prod).

---

### Challenges & Decisions

| Challenge | Decision |
|-----------|----------|
| Multi-ERP auth without coupling UI to each OAuth | Provider factory on Auth Gateway; single `POST /auth/action` with `x-provider` |
| Isolate secrets / blast radius | Auth and Unified on separate K8s clusters + network policies |
| Scale ERP work independently | Per-entity microservices + umbrella Helm; independent image deploys |
| Async create/sync without blocking the app | Kafka request/response + connection sync lifecycle topics |
| Sage/NetSuite API quirks (segments, pagination, scopes) | `TestFolder` findings-first R&D before coding; evidence + live scripts |
| Sage custom/UDD segments | Explicitly out of scope; standard dimensions + class only |
| Sage sync not finished | Fetch path live-verified; persistence/mappers/Kafka sync still open |
| Bill attachments (QBO) | Create bill first, then GCS download → QBO upload via attachment factory |

---

### Impact

- One connector stack for QBO, NetSuite, and expanding Sage instead of one-off integrations.
- Clear separation: auth, orchestration, and ERP adapters can deploy and scale independently.
- Kafka gives durable async create/sync between Zact app and ERPs.
- TestFolder shortens ERP discovery and cuts rework on segments, query limits, and field mapping.
- Helm/umbrella + env charts support repeatable deploy across dev/staging/prod.

---

### What's Next

From current repo state (especially Sage + docs):

1. **Sage Intacct sync end-to-end** — DB persistence, platform mappers, Kafka sync (fetch path already done).
2. **Broaden Sage create** — vendor POST and other write paths still stubbed/incomplete.
3. **More auth providers** — Xero / NetSuite / QBD on the Auth Gateway provider pattern.
4. **Harden ops** — staging HPA patterns, metrics, and cluster separation as the default for prod.
5. **Keep TestFolder current** — update FINDINGS when implementation status changes; add QBO research folder only if needed.

---

If you want this saved into a file (e.g. root `README.md` or `docs/PROJECT_OVERVIEW.md`), say which path and approve an edit.