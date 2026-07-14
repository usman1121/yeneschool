# YeneSchool — School Management System

> **Built by HUMAN Tech PLC — Addis Ababa, Ethiopia**

YeneSchool is a full-stack, multi-tenant School Management System designed for Ethiopian and East African educational institutions. It handles the complete lifecycle of academic operations — from enrollment and attendance to grading, exams, finance, and communication — in a single, unified platform.

---

## Table of Contents

1. [Why YeneSchool?](#1-why-yeneschool)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Multi-Tenancy & Security](#4-multi-tenancy--security)
5. [Role-Based Access Control](#5-role-based-access-control)
6. [Feature Modules](#6-feature-modules)
7. [Modularity & Extensibility](#7-modularity--extensibility)
8. [Offline-First Architecture](#8-offline-first-architecture)
9. [Internationalization (i18n)](#9-internationalization-i18n)
10. [Infrastructure & Deployment](#10-infrastructure--deployment)
11. [Roadmap](#11-roadmap)

---

## 1. Why YeneSchool?

| Problem | YeneSchool Solution |
|---|---|
| Paper-based records lost or damaged | Fully digital, backed up PostgreSQL database |
| Disconnected systems (finance, attendance, grades) | Single unified platform — one source of truth |
| Manual report card generation | Automated, configurable report cards with grade scales |
| No parent visibility into student progress | Parent portal with real-time grades, attendance, fees |
| Ethiopian calendar not supported | First-class Ethiopian calendar integration alongside Gregorian |
| Poor internet reliability | Offline-first attendance with automatic sync |
| No exam seating management | Built-in exam seating planner with QR codes |
| Expensive proprietary software | Open-core, modern stack, self-hosted or SaaS |

---

## 2. Tech Stack

### Backend

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 |
| Framework | **NestJS 11** (TypeScript) |
| ORM | **Prisma 7** with PostgreSQL 16 |
| Cache / Queue | Redis 7 (BullMQ, ioredis) |
| Auth | JWT (cookie-based) + Passport.js |
| Validation | class-validator + class-transformer |
| File Processing | Sharp (images), PDFKit (PDFs), ExcelJS (spreadsheets) |
| Push Notifications | Web Push API |
| Translation | Azure Translator / Google Translate |
| Scheduling | @nestjs/schedule (cron) |

### Frontend

| Layer | Technology |
|---|---|
| Framework | **Next.js 14** (App Router, React 18, TypeScript) |
| Styling | Tailwind CSS 3 + Shadcn/ui + Radix UI primitives |
| State (Server) | TanStack Query v5 |
| State (Client) | Zustand 5 + React Context |
| Forms | React Hook Form + Zod |
| Charts | Recharts + Visx |
| Calendar | react-big-calendar + Ethiopian calendar libraries |
| Offline DB | Dexie.js (IndexedDB) |
| Animations | Framer Motion |
| Notifications | Sonner (toasts) + Web Push |

### Infrastructure

| Component | Technology |
|---|---|
| Reverse Proxy | Nginx (alpine) with rate limiting |
| Containerization | Docker / Docker Compose |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Deployment | Hetzner / any VPS |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js 14 (App Router)                   │  │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  │
│  │  │ Auth    │ │ Dashboard│ │  Admin   │ │  Parent  │ │  │
│  │  │ Pages   │ │  Pages   │ │  Pages   │ │  Pages   │ │  │
│  │  └─────────┘ └──────────┘ └──────────┘ └──────────┘ │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │         TanStack Query (Server State)             │ │  │
│  │  ├──────────────────────────────────────────────────┤ │  │
│  │  │  Zustand (Client State)  │  Dexie.js (Offline)   │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│                    HTTP (with credentials)                    │
│                           ▼                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Nginx Reverse Proxy                        │  │
│  │  ┌────────────── Rate Limiting Zones ──────────────┐  │  │
│  │  │  auth_login: 5/min │ api_global: 120/min        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              NestJS 11 API Server                       │  │
│  │                                                         │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  │
│  │  │  Auth    │ │  RBAC    │ │  School  │ │ Student  │ │  │
│  │  │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  │
│  │  │  Exams   │ │ Finance  │ │Grading   │ │Attendance│ │  │
│  │  │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  │
│  │  │ Messages │ │  Siren   │ │Automation│ │  Sync    │ │  │
│  │  │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │  │
│  │                                                         │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Guards: JwtAuth │ Roles │ Permissions │ Sub    │  │  │
│  │  │  Services: Event Bus │ Audit │ Translation        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│                    ┌──────┴──────┐                           │
│                    ▼             ▼                           │
│           ┌────────────┐  ┌────────────┐                    │
│           │ PostgreSQL │  │   Redis    │                    │
│           │    16      │  │     7      │                    │
│           └────────────┘  └────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
React Component
  → useQuery / useMutation (TanStack Query)
    → API Module (lib/api/*.ts)
      → Axios core (interceptors: 401→sign-in, 403→denied, 503→maintenance)
        → HTTP (withCredentials)
          → Nginx (rate limited, HTTPS)
            → NestJS Controller (guards: JWT → Roles → Permissions → Subscription)
              → Service Layer (business logic)
                → PrismaService (connection pool)
                  → PostgreSQL 16
```

### Backend Module Pattern (NestJS)

Every feature follows a consistent NestJS module pattern:

```
Module/
  ├── module.ts          # @Module({ imports, controllers, providers, exports })
  ├── controller.ts      # Routes, guards, DTO validation
  ├── service.ts         # Business logic, Prisma queries
  ├── dto/               # class-validator DTOs
  │   ├── create-*.dto.ts
  │   └── update-*.dto.ts
  └── types/             # TypeScript types, enums
```

This consistent pattern means any developer can understand any module immediately.

### Frontend Pattern (Next.js App Router)

```
app/
  ├── (dashboard)/       # Authenticated, layout with sidebar + navbar
  │   ├── admin/         # 21 sub-routes
  │   ├── teacher/       # 9 sub-routes
  │   ├── student/       # 7 sub-routes
  │   ├── parent/        # 12+ sub-routes
  │   ├── finance/       # Finance operations
  │   ├── registrar/     # Enrollment & records
  │   └── superadmin/    # System-wide admin
  ├── sign-in/           # Public
  ├── enroll/            # Self-enrollment
  └── api/proxy/[...path] # Unified backend proxy
```

---

## 4. Multi-Tenancy & Security

### Tenant Isolation Strategy

| Layer | Mechanism |
|---|---|
| **Database** | Every tenant-scoped table has a `schoolId` column |
| **JWT** | `schoolId` is embedded in JWT — never accepted from request body |
| **Redis** | All cache keys prefixed with `school:{schoolId}:` |
| **Super Admin** | Can bypass school scoping for platform-wide operations |
| **Cross-School** | Data access prohibited for all non-superadmin roles |

### Security Features

- **JWT cookies** (HTTP-only, secure in production, 8h expiry)
- **Passport.js** strategies: Local + JWT
- **Rate limiting**: 5 req/min on login, 3 req/min on password reset, 120 req/min globally
- **Security headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- **Validation**: Global `ValidationPipe` with `whitelist: true, forbidNonWhitelisted: true`
- **Axios interceptors**: Automatic redirect on 401 (sign-in), 403 (access denied), 503 (maintenance)
- **Body limit**: 10MB for uploads

---

## 5. Role-Based Access Control

### 8 Built-in Roles

| Role | Scope | Capabilities |
|---|---|---|
| **SUPER_ADMIN** | Platform-wide | All schools, all features, system settings |
| **ADMIN** | Per-school | Full school administration |
| **IT_MANAGER** | Per-school | Technical: users, classes, timetable |
| **REGISTRAR** | Per-school | Enrollment, student records |
| **TEACHER** | Per-school | Grading, exams, attendance, lessons |
| **FINANCE** | Per-school | Fee structures, payments, payroll |
| **STUDENT** | Self | View grades, timetable, attendance, practice exams |
| **PARENT** | Children | View children's grades, fees, discipline, attendance |

### Guard Chain (per request)

```
JwtAuthGuard → RolesGuard → PermissionsGuard → SubscriptionGuard
```

Custom decorators: `@Roles()`, `@Permissions()`, `@AllowSuperAdminMixedRole()`

---

## 6. Feature Modules

### 6.1 Academic Management

| Feature | Description |
|---|---|
| **Academic Years** | Create/list/activate with Ethiopian or Gregorian calendars; curriculum types: SEMESTER, QUARTER, TERM, CUSTOM; terms with percentage weights |
| **Classes & Sections** | Grade-level classes with streams (A, B, C...), homeroom teachers |
| **Subjects** | Subject definitions with codes, grades, credits, color codes |
| **Class-Subject Links** | Link subjects to classes/sections with assigned teachers |
| **Timetable** | Period-based slots, configurable period times, day-of-week scheduling |
| **Period Times** | Configurable bell/period times per school |

### 6.2 Student Management

| Feature | Description |
|---|---|
| **Student Profiles** | Full records with student codes, FAYDA numbers, enrollment status, roll numbers |
| **Student Classes** | Enroll students in classes/sections per academic year |
| **Bulk Upload** | CSV/Excel bulk import with validation |
| **ID Cards** | Generate student ID cards with QR codes |
| **Student Portal** | Grades, timetable, attendance, lessons, practice exams |
| **Auto Assignment** | Rule-based auto-assignment of students to classes/sections |

### 6.3 Teacher Management

| Feature | Description |
|---|---|
| **Teacher Profiles** | Employee IDs, departments, specializations |
| **Subject Assignments** | Assign subjects per class/section |
| **Teacher Portal** | Grading, lessons, attendance, exams, timetable |

### 6.4 Attendance (Offline-First)

| Feature | Description |
|---|---|
| **Sessions** | Teachers create attendance sessions per class/period |
| **Records** | Per-student: PRESENT, ABSENT, LATE, EXCUSED |
| **Offline Mode** | Dexie.js IndexedDB stores locally when offline |
| **Auto Sync** | Background sync when connection restores |
| **Conflict Resolution** | SyncConflict model + SyncModule for data consistency |

```
Offline Attendance Flow:
  Teacher marks attendance offline
    → Dexie.js IndexedDB (local)
      → useNetworkStatus detects connectivity
        → sync-service.ts pushes to backend
          → POST /sync → SyncModule resolves conflicts
            → Server merges or flags SyncConflict
```

### 6.5 Grading & Assessment

| Feature | Description |
|---|---|
| **Grade Components** | Configurable components: CA, Midterm, Final (with weights) |
| **Subject Grades** | Per-term workflow: DRAFT → SUBMITTED → APPROVED / REJECTED |
| **Grade Scales** | Configurable A–F ranges with grade points |
| **Grade Change Log** | Full audit trail for every grade change |
| **Assessments** | Schedule with types: midterm, final, quiz, practical, assignment |
| **Assessment Subjects** | Per-class, per-section with teachers and max scores |
| **Financial Clearance** | Grade release gated on fee status |

### 6.6 Exams

| Feature | Description |
|---|---|
| **Exam Management** | Types: MID_TERM, FINAL, QUIZ, PRACTICAL, ASSIGNMENT |
| **Exam Results** | Per-student marks and grades with reporting |
| **Seating Plans** | SINGLE_GRADE / GRADE_RANGE modes, sections, individual seat assignments |
| **National Exams** | Import results from NEAEA / regional bureaus (Grade 6, 8, 12 ESLCE) |

### 6.7 Practice Exams (Online)

| Feature | Description |
|---|---|
| **Question Types** | MCQ, True/False, Short Answer |
| **Auto-Grading** | Automatic scoring for objective questions |
| **Timed Attempts** | In-progress, submitted, expired statuses |
| **Access Codes** | Exam access via generated codes |
| **Attempt History** | Full student attempt tracking |

### 6.8 Finance

| Feature | Description |
|---|---|
| **Fee Structures** | Billing methods: FULL_PAYMENT, PER_TERM, MONTHLY, INSTALLMENT |
| **Student Fees** | Per-student tracking: paid, pending, overdue |
| **Payments** | Processing with digital receipts |
| **Discount Policies** | Percentage or fixed discounts |
| **Payroll** | Salary management, payroll runs (DRAFT → APPROVED → PAID), tax tracking |
| **Audit Log** | Full financial audit trail |
| **Currency** | ETB (Ethiopian Birr), 10-school-month calendar |

### 6.9 Parent Portal

| Feature | Description |
|---|---|
| **Linked Students** | Multiple children via ParentStudent join table |
| **Relationship Types** | Father, Mother, Guardian |
| **Dashboard** | Real-time: grades, fees, discipline, attendance, timetable |
| **Communication** | Direct communication with teachers |

### 6.10 Communication & Notifications

| Feature | Description |
|---|---|
| **Communication Book** | Student–Parent–Teacher communication; categories: ACADEMIC, ATTENDANCE, DISCIPLINE, HEALTH, GENERAL; workflow: OPEN → ACKNOWLEDGED → CLOSED |
| **Internal Messaging** | Staff-to-staff with conversations and participants |
| **Announcements** | School-wide with priority targeting |
| **Push Notifications** | Web Push API with subscription management |
| **Preference Management** | Per-user notification preferences |

### 6.11 Siren / Bell System

| Feature | Description |
|---|---|
| **Schedules** | Configurable bell schedules by day of week and time |
| **Events** | Historical ring events with status tracking |
| **Hardware Integration** | Webhook-based integration for physical bell systems |
| **Override Control** | Manual bell triggers |

### 6.12 Discipline

| Feature | Description |
|---|---|
| **Incident Tracking** | Per-student discipline records |
| **Severity Levels** | LOW, MEDIUM, HIGH, CRITICAL |
| **Status Workflow** | OPEN → INVESTIGATING → RESOLVED → ESCALATED |

### 6.13 Content & Lessons

| Feature | Description |
|---|---|
| **Unified Content** | Lessons, homework, assignments in one model |
| **Content Types** | LESSON, HOMEWORK, ASSIGNMENT with workflows |
| **Submissions** | Student submissions with grading and feedback |
| **Resources** | Attachments and resources per content item |
| **Syllabus Mapping** | Topics, objectives, competencies mapped to curriculum |

### 6.14 Automation Engine

| Feature | Description |
|---|---|
| **Event-Driven Rules** | Triggers: `attendance.marked`, `fee.overdue`, etc. |
| **Actions** | SEND_SMS, SEND_EMAIL, PUSH_NOTIFICATION, CREATE_ALERT, UPDATE_DATABASE_FIELD |
| **Execution Logs** | Full logging with success/failure tracking |
| **Retry Logic** | Dead-letter queue for failed executions |

### 6.15 System & Administration

| Feature | Description |
|---|---|
| **Global Search** | Cross-entity search across all modules |
| **Audit Logging** | Comprehensive system-wide audit trail |
| **Data Quality** | Automated data integrity checks and reports |
| **Backup Management** | Database backup scheduling |
| **Platform Settings** | Global key-value configuration |
| **School Settings** | Per-school key-value + dedicated settings model |
| **Template Engine** | Document templates: ID cards, certificates |
| **Credential Generator** | Auto-generate usernames/passwords for users |
| **Bulk Upload Engine** | CSV/Excel import with validation and progress tracking |

### 6.16 Subscription & Plans

| Tier | Description |
|---|---|
| **CORE** | Essential academic management |
| **STANDARD** | Academic + Finance + Communication |
| **ULTIMATE** | All features including Exams, Automation, API access |

Feature gating via `FeatureGuard` (frontend) and `SubscriptionGuard` (backend).

---

## 7. Modularity & Extensibility

### Backend: 51+ NestJS Modules

Every module is a self-contained NestJS feature module:

```
auth/          rbac/          school/        student/       teacher/
parent/        registrar/     academic-year/ class/         section/
subjects/      class-subject/ timetable-slot/period-time/   enrollment/
calendar/      attendance/    grading/       assessments/   exams/
practice-exams/ report-card/  finance/       fee-structure/ payments/
discount-policy/ student-fee/ payroll/       communication/ messaging/
announcement/  event/         notification/  lesson/        siren/
discipline/    sync/          bulk-upload/   dashboard/     search/
credential/    templates/     subscription/  platform-settings/
school-settings/ data-quality/ backup/       audit/         translation/
auto-assignment/ automation-engine/          infrastructure/ core/
```

### Frontend: Modular Architecture

```
api/            — 42 API modules (one per backend module)
components/     — Shared UI: Shadcn/ui (33), charts, forms, filters
context/        — 5 React contexts (Auth, Calendar, AcademicYear, Breadcrumb, Subscription)
hooks/          — 9 custom hooks (debounce, form drafts, network, offline, translations)
stores/         — 3 Zustand stores (theme, language, UI)
messages/       — i18n JSON files for 5 languages
types/          — Shared TypeScript types
```

### Provider Hierarchy (Composable)

```
QueryClientProvider (TanStack Query)
  └── AuthProvider
      └── CalendarProvider
          └── ThemeProvider
              └── RouteTransition
                  └── SubscriptionWrapper
                      └── AcademicYearProvider
                          └── BreadcrumbProvider
```

### Event Bus System

Custom `EventBusService` for decoupled, event-driven architecture:

- **Publishers**: Any module can emit events
- **Listeners**: Separate modules listen without direct coupling
- **Persistence**: Events logged in `EventStore` table
- **Resilience**: Failed events go to `DeadLetterEvent` table
- **Use case**: Powers the Automation Engine, superadmin notifications

---

## 8. Offline-First Architecture

### Why Offline-First?

Ethiopian and East African schools often face unreliable internet connectivity. YeneSchool was designed from day one to work without a stable connection.

### Offline Stack

| Component | Role |
|---|---|
| **Dexie.js 4** | IndexedDB wrapper for client-side storage |
| **useNetworkStatus** | React hook detecting online/offline state |
| **useOfflineAttendance** | Attendance-specific offline hook |
| **SyncModule (backend)** | Server-side sync with conflict resolution |
| **SyncConflict model** | Record and resolve data conflicts |

### Sync Strategy

- Attendance records stored locally in IndexedDB
- Background sync when connectivity restores
- Conflict detection with timestamp-based resolution
- Failed syncs logged with retry capability

---

## 9. Internationalization (i18n)

### Supported Languages

| Language | Code | Script |
|---|---|---|
| English | `en` | Latin |
| Amharic | `am` | Ge'ez (Fidel) |
| Arabic | `ar` | Arabic |
| Oromo | `om` | Latin |
| Somali | `so` | Latin |

### Architecture

- **Custom system** (lightweight, no framework dependency)
- **Frontend**: Zustand store + JSON message files + `useTranslations(module)` hook
- **Backend**: Translation files + dynamic providers (Azure / Google Translate)
- **Ethiopian Calendar**: Native support via `ethiopian-calendar-new` + `ethiopian-date`

---

## 10. Infrastructure & Deployment

### Docker Compose Stack (5 services)

| Service | Image | Port | Health Check |
|---|---|---|---|
| **postgres** | postgres:16-alpine | 5432 | `pg_isready` |
| **redis** | redis:7-alpine | 6379 | `redis-cli ping` |
| **backend** | node:20-slim | 8001 | `GET /health` |
| **frontend** | node:20-slim | 8000 | `GET /sign-in` |
| **nginx** | nginx:alpine | 80 / 443 | `nginx -t` |

### Deployment Options

```
Production:  docker compose -f docker-compose.yml up -d
Development: docker compose -f docker-compose.dev.yml up -d
```

### Nginx Configuration

- **SSL termination** with HTTP → HTTPS redirect
- **4 rate limiting zones**: login (5/min), password reset (3/min), register (5/min), global API (120/min)
- **Route mapping**: `/api/` → backend, `/` → frontend
- **Security headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- **Max body size**: 20MB

### Key Environment Variables (38 total)

```
DATABASE_URL      — PostgreSQL connection string
REDIS_URL         — Redis connection string
JWT_SECRET        — JWT signing secret
JWT_EXPIRATION    — Token expiry (default: 8h)
TRANSLATION_PROVIDER — azure | google | disabled
```

Full template in `.env.example`.

---

## 11. Roadmap

| Feature | Status |
|---|---|
| **AI Assistant** | Planned |
| **Library Management** | Planned |
| **Transport Management** | Planned |
| **Hostel Management** | Planned |
| **Inventory Management** | Planned |
| **SMS / Email System** | Planned |
| **Advanced Analytics** | Planned |
| **Mobile App** | Under consideration |

---

## Why Partner with YeneSchool?

1. **Purpose-built for Ethiopia**: Ethiopian calendar, Birr currency, NEAEA national exam imports, Amharic/Oromo/Somali support
2. **Modern technology stack**: NestJS + Next.js + PostgreSQL — not legacy PHP or outdated frameworks
3. **Offline-first**: Designed for real-world connectivity conditions
4. **Modular and extensible**: Add features without breaking existing ones
5. **Multi-tenant by design**: One platform powers any number of schools
6. **Open-core philosophy**: Self-hosted, no vendor lock-in
7. **Built by educators, for educators**: HUMAN Tech PLC, Addis Ababa

---

*YeneSchool v0.5.0 — HUMAN Tech PLC, Addis Ababa, Ethiopia*
