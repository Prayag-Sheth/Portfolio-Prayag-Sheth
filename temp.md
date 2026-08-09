<!-- Raw chat discussion -->

Distributed Financial Data Integration:
Expanded `project-docs/Zact-ERP-Connector-Platform.md` into a full technical reference. Here's what it now covers:

### Document structure

1. **Introduction** — Four-layer architecture (MS, Unified Backend, Auth Gateway, Webapp)
2. **Problem & Requirement** — Why multi-ERP integration needs this platform
3. **High-level architecture** — Full system diagram with cluster separation
4. **Repository structure** — Every folder explained
5. **Microservices layer** — All 7 services, ports (8000–8007), API Gateway proxy routes, adapter pattern
6. **Unified Backend** — Modules, REST endpoints, full Prisma schema breakdown
7. **Kafka messaging** — All 15+ topics, entity create sequence diagram, sync flow, message envelope format
8. **Auth Gateway** — QBO/NetSuite/Sage providers, `/auth/action` API, OAuth sequence diagram
9. **Web App** — Angular connector UI role
10. **ERP deep dive** — QBO (production), NetSuite (cseg research), Sage Intacct (fetch done, sync WIP)
11. **Entity support matrix** — What works end-to-end per ERP
12. **TestFolder** — R&D workspace, test commands, findings files
13. **Local dev** — Kafka Docker, MS startup, auth gateway setup
14. **Deployment** — K8s clusters, namespaces, HPA, CI/CD
15. **Design patterns** — 10 architectural patterns used
16. **Quick reference table** — Which file to read for each topic

### Key findings from the deep dive

- **Zact App is external** — this repo is only the connector infrastructure
- **Kafka is the main bus** between Zact App and Unified Backend (not used inside microservices)
- **Auth runs in a separate K8s cluster** from business logic (security isolation)
- **NetSuite has special handling** — custom segments (cseg1/cseg3), rate limiting, extensive TestFolder research
- **Sage Intacct** — fetch path live-verified; full sync/persistence still pending
- **Each microservice deploys independently** via Helm umbrella chart

Open `project-docs/Zact-ERP-Connector-Platform.md` for the full document. I can go deeper on any section — Kafka message schemas, NetSuite cseg rules, or a specific microservice.




Renamed and rewritten for sales language.

### Product name
**LedgerBridge** — multi-ERP accounting sync platform

### File change
- Removed: `project-docs/Zact-ERP-Connector-Platform.md`
- Added: `project-docs/LedgerBridge.md`
- Updated: `context.md` to use **LedgerBridge**

### How the description is framed now
| Old (internal) | New (sellable / generic) |
|----------------|--------------------------|
| Zact / Satva | Not used in product narrative |
| Zact app | **Client application** |
| Unified backend / MS | **Our orchestration server** / **our ERP microservices** |
| Auth gateway | **Our auth service** |
| Folder `Zact` | Kept only as **Source** (not the product title) |

### Sales one-liner
*LedgerBridge connects your finance product to QuickBooks Online, NetSuite, and Sage Intacct — syncing accounting data both ways without custom ERP code in your app.*

If you want a different market name (e.g. **SyncLedger**, **AccountsLink**, **ERPRelay**), say which you prefer and I’ll rename the file + titles.




You're right to push back on calling it a "sync app." For a technical interviewer, frame it as a **bidirectional, Kafka-based integration platform** — sync is one channel, not the product.

---

### How to open (30 seconds)

> "I worked on **LedgerBridge** — a multi-ERP integration platform. The client application never talks to QuickBooks or NetSuite directly. It communicates with our servers over **Kafka** using a unified message contract. It's **bidirectional**: the client can **push** transactions into an ERP via create-request topics, and our system **pulls** master data from the ERP and streams it back in batched sync-response topics. Under that sits an orchestration server, seven ERP microservices, a separate auth cluster, per-ERP mappers/validators, and a full MySQL persistence layer."

---

### Why it's not "just sync"

| Sync app mental model | What LedgerBridge actually is |
|----------------------|------------------------------|
| Cron polls DB A → writes DB B | **Event-driven bus** with 15+ topics |
| One direction | **Two pipelines**: CREATE (client→ERP) and SYNC (ERP→client) |
| Stateless proxy | **Stateful middle tier**: validate → map → persist → audit → respond |
| Same API for everyone | **Canonical model** on the bus; ERP specifics hidden in our servers |

The product is the **communication channel + translation layer**, not a scheduled job.

---

### The two directions (this is the core)

**Outbound — client pushes to ERP**
```
Client → UNIFIED_BILLS_CREATE_REQUEST (Kafka)
       → Our orchestration server consumes
       → Validate unified payload
       → Map to NetSuite/QBO/Sage format
       → HTTP → ERP microservice → ERP API
       → Save to MySQL
       → UNIFIED_BILLS_CREATE_RESPONSE (one message per item)
       → Client consumes result
```

**Inbound — ERP data flows to client**
```
Trigger (connect / cron / Sync Now message)
       → Fetch paginated data from ERP via microservices
       → Upsert MySQL + track sync state
       → Batch 500 records per message
       → UNIFIED_VENDORS_SYNC_RESPONSE (etc.)
       → UNIFIED_CONNECTION_SYNC_INFO (lifecycle events)
       → Client reconciles its datastore
```

Different handlers, different topics, shared auth and persistence.

---

### What makes it "big" engineering

1. **3 ERPs × 7+ entity types** — each combo needs its own mapper, validator, and often different API semantics (NetSuite `cseg` on header vs line, Sage query service with 9 dimension fan-out, QBO minor version handling).

2. **Kafka contract design** — paired request/response topics, per-item responses for partial batch failure, correlation ids, configurable topic names per environment.

3. **Microservice decomposition** — vendor, bill, payment, JE, expense, account, class — each independently deployable on K8s via Helm umbrella chart.

4. **Auth isolation** — OAuth in a **separate cluster** from sync workloads; provider factory pattern (`qbo | netsuite | sage_intacct`).

5. **Operational depth** — every Kafka message and HTTP call logged to `requestLog`; sync operations tracked with retry counts; entity-level last-sync timestamps.

6. **Rate limiting & attachments** — NetSuite single-flight concurrency; bill create strips attachments, posts entity first, uploads files second.

---

### One-liner for the interviewer

> "It's a **Kafka-mediated bidirectional integration platform** — unified messages on the bus, ERP-specific logic behind our servers. Sync is the inbound channel; entity create is the outbound channel. Both are async, audited, and ERP-agnostic at the client boundary."

---

I've added a full **Technical Interview Narrative** section to `project-docs/LedgerBridge.md` with architecture diagrams, topic tables, walkthroughs of both pipelines, and sample "what did you build?" talking points. Use that as your prep doc before interviews.