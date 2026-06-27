# YeneSchool 🇪🇹
### The Definitive Integrated School Management System for Ethiopia

YeneSchool is a robust, all-in-one school ERP platform designed from the ground up to handle the unique administrative, grading, and operational workflows of Ethiopian schools. It unifies enrollment, attendance, grading, finance, communication, and parent portals into a single platform.

🌐 **Live Website:** [yeneschool.me](https://yeneschool.me)

---

## Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│  Frontend     │────▶│  Backend API     │────▶│  PostgreSQL   │
│  Next.js:8000 │     │  NestJS:8001     │     │  + Prisma     │
└──────────────┘     └────────┬─────────┘     └──────────────┘
                              │
                       ┌──────▼──────┐
                       │  Redis 7    │
                       │  (cache/q)  │
                       └─────────────┘
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix UI), Zustand, TanStack React Query, Framer Motion, Recharts |
| **Backend** | NestJS 11, TypeScript, Prisma 7 ORM, PostgreSQL 16, JWT + Passport (RBAC — 8 roles), ioredis (Redis 7), Sharp, pdfkit/pdf-lib, exceljs, web-push, Archiver |
| **Auth** | JWT cookie auth with role-based access control |
| **Offline** | Dexie.js (IndexedDB) for offline-first attendance with auto-sync |
| **i18n** | English, Amharic, Arabic, Oromo, Somali — Ethiopian calendar (13 months) |
| **Infrastructure** | Docker (multi-stage builds), Docker Compose, Nginx reverse proxy, standalone Next.js output |

---

## Core Features

- **Academic** — Academic years, terms, classes, sections, subjects, timetables, grade books, report cards
- **Attendance** — Offline-first tracking (present/absent/late/excused) with auto-sync when online
- **Finance** — Fee management, installment plans, ETB billing (10-school-month model), discounts, payroll, receipts
- **Communication** — Internal messaging, announcements, push notifications (Web Push API)
- **Siren/Bell** — Configurable schedules with hardware webhook support
- **Enrollment** — Self-registration or admin-created, approval workflow, auto student code generation
- **Multi-Language** — English, Amharic, Arabic, Oromo, Somali with Ethiopian calendar as primary
- **Examinations** — Online exam support with practice exams
- **Reports & Analytics** — Report cards (DRAFT → PUBLISHED → ARCHIVED), Recharts dashboards

---

## Roles

`SUPER_ADMIN` · `ADMIN` · `TEACHER` · `STUDENT` · `PARENT` · `REGISTRAR` · `FINANCE` · `HR`

| Role | Scope |
|------|-------|
| **Super Admin** | Platform-level settings, school management |
| **Admin** | Full school operations, system logs, global config |
| **Registrar** | Enrollment, student profiles, records |
| **Teacher** | Grade entry, attendance, class/subject assigned |
| **Student** | Homework, schedules, grades, report cards |
| **Parent** | Attendance, grades, fees, discipline — linked children only |
| **Finance** | Fee setup, invoices, receipts, payroll |
| **HR** | Staff records, departments, teacher assignments |

---

## Domain Rules

- **Calendar:** Academic year runs Meskerem (Sep) to Sene (Jun). Ethiopian calendar primary. Only one `IS_CURRENT` academic year per school.
- **Curriculum periods:** SEMESTER, TRIMESTER, QUARTER, or CUSTOM.
- **Grading:** 0–100 scale, pass mark 50 (configurable). Gradebook workflow: DRAFT → PUBLISHED → ARCHIVED.
- **Finance:** ETB currency. School months = 10. Billing: FULL_PAYMENT, PER_TERM, MONTHLY, INSTALLMENT. Discount: PERCENTAGE or FIXED_AMOUNT.
- **Attendance:** Offline-first via Dexie. Once approved, cannot be modified. Tracks present, absent, late, excused.
- **Multi-tenancy:** Every tenant-scoped table has a `schoolId` column. Never derived from request body — always from JWT.
- **Enrollment:** Student applies → admin approves → system generates code → assigned to class + section + year.

---

## Quick Start

```bash
# Backend
cd backend && npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev

# Frontend
cd frontend && npm install
cp .env.local.example .env.local
npm run dev
```

### Docker

```bash
# Production
docker compose up -d --build

# Development (hot reload)
docker compose -f docker-compose.dev.yml up --build
```

---

## Environment Variables

**Backend** (`.env`):
```
DATABASE_URL="postgresql://user:pass@localhost:5432/sms"
JWT_SECRET="your-secret-key"
TRANSLATION_PROVIDER="disabled"       # azure | google | disabled
AZURE_TRANSLATOR_KEY=""               # required when provider is azure
GOOGLE_TRANSLATE_API_KEY=""           # required when provider is google
```

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL="http://localhost:8001"
```

---

## Project Structure

```
├── backend/                          # NestJS 11 API (~50 modules)
│   ├── prisma/                       # Schema, migrations, seed
│   ├── src/
│   │   ├── main.ts                   # Bootstrap
│   │   ├── app.module.ts             # Root module
│   │   ├── auth/                     # Login, register, JWT, passwords
│   │   ├── rbac/                     # Role/permission guards (8 roles)
│   │   ├── prisma/                   # PrismaModule (global)
│   │   ├── audit/                    # Audit logging
│   │   ├── backup/                   # Database backup
│   │   ├── bulk-upload/              # CSV bulk operations
│   │   ├── calendar/                 # Ethiopian calendar
│   │   ├── translation/             # i18n (Azure/Google/disabled)
│   │   ├── sync/                     # Offline sync endpoints
│   │   ├── search/                   # Global search
│   │   ├── subscription/            # Plan-gated features
│   │   ├── notification/            # Web push notifications
│   │   ├── academic-year/           # Academic periods
│   │   ├── class/                    # Classes & sections
│   │   ├── class-subject/           # Subject-teacher assignments
│   │   ├── section/                  # Section management
│   │   ├── subjects/                # Subject catalog
│   │   ├── timetable-slot/         # Timetable periods
│   │   ├── student/                 # Student profiles
│   │   ├── teacher/                 # Teacher profiles
│   │   ├── parent/                  # Parent profiles & links
│   │   ├── enrollment/             # Application → approval → code
│   │   ├── attendance/              # Offline-first, approval, sync
│   │   ├── grading/                 # Grade books
│   │   ├── assessments/            # Assessment config
│   │   ├── exams/                   # Online exams
│   │   ├── practice-exams/         # Practice exam questions
│   │   ├── report-card/            # DRAFT → PUBLISHED → ARCHIVED
│   │   ├── finance/                 # Fees, installments, payroll
│   │   ├── communication/          # Internal messaging
│   │   ├── announcement/           # School announcements
│   │   ├── messaging/              # Direct messaging
│   │   ├── discipline/             # Conduct records
│   │   ├── lesson/                 # Lesson plans
│   │   ├── siren/                  # Bell schedules & webhooks
│   │   ├── event/                  # School events
│   │   ├── dashboard/             # Aggregated data endpoints
│   │   ├── data-quality/          # Data validation
│   │   ├── credential/            # ID card generation
│   │   ├── templates/             # Document templates
│   │   ├── infrastructure/        # Config, storage, caching
│   │   ├── school/                # School settings
│   │   ├── school-settings/       # Per-school config
│   │   ├── platform-settings/    # Super admin config
│   │   ├── registrar/            # Registrar workflows
│   │   ├── auto-assignment/      # Auto class/section placement
│   │   └── common/               # Shared utilities
│   └── ...
├── frontend/                         # Next.js 14 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (dashboard)/         # Role-scoped layouts
│   │   │   │   ├── admin/           # Admin workspace
│   │   │   │   ├── teacher/         # Teacher workspace
│   │   │   │   ├── student/         # Student workspace
│   │   │   │   ├── parent/          # Parent workspace
│   │   │   │   ├── registrar/       # Registrar workspace
│   │   │   │   ├── finance/         # Finance workspace
│   │   │   │   ├── it-manager/      # IT manager workspace
│   │   │   │   ├── superadmin/      # Super admin panel
│   │   │   │   ├── attendance/      # Attendance views
│   │   │   │   ├── list/            # Data tables & lists
│   │   │   │   ├── messages/        # Internal messaging
│   │   │   │   ├── notifications/   # Push notification history
│   │   │   │   ├── profile/         # User profile
│   │   │   │   ├── settings/        # User settings
│   │   │   │   ├── help/            # Help & support
│   │   │   │   └── platform-settings/ # Platform config
│   │   │   ├── sign-in/             # Login page
│   │   │   ├── enroll/              # Student self-registration
│   │   │   ├── enrollments/         # Enrollment status
│   │   │   ├── schools/             # School listing (super admin)
│   │   │   ├── forgot-password/     # Password reset
│   │   │   ├── change-password/     # Password change
│   │   │   ├── access-denied/       # 403 page
│   │   │   ├── api/                 # Next.js API routes (auth proxies)
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── providers.tsx        # Context providers
│   │   │   └── globals.css          # Tailwind base
│   │   ├── components/              # Shared UI
│   │   │   ├── ui/                  # shadcn/ui primitives
│   │   │   ├── forms/               # Form components
│   │   │   ├── charts/              # Recharts wrappers
│   │   │   ├── timetable/           # Timetable components
│   │   │   ├── finance/             # Finance-specific UI
│   │   │   ├── siren/               # Siren controls
│   │   │   ├── announcement/        # Announcement components
│   │   │   ├── communications/      # Messaging UI
│   │   │   ├── students/            # Student components
│   │   │   ├── filters/             # Table filters
│   │   │   ├── translation/         # Language switcher
│   │   │   ├── Navbar.tsx           # Top navigation
│   │   │   ├── Menu.tsx             # Sidebar menu
│   │   │   ├── Table.tsx            # Generic data table
│   │   │   ├── Pagination.tsx       # Pagination
│   │   │   ├── Breadcrumb.tsx       # Breadcrumb nav
│   │   │   ├── InputField.tsx       # Form input
│   │   │   ├── FormModal.tsx        # Modal form wrapper
│   │   │   ├── GlobalSearch.tsx     # Global search bar
│   │   │   ├── FeatureGuard.tsx     # Feature-gate wrapper
│   │   │   ├── RouteTransition.tsx  # Page transitions
│   │   │   ├── BigCalendar.tsx      # Calendar component
│   │   │   ├── WeeklyCalendar.tsx   # Weekly view
│   │   │   ├── StudentIdCard.tsx    # ID card preview
│   │   │   ├── UserAvatarUpload.tsx # Avatar upload
│   │   │   ├── PushNotificationManager.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ToastProvider.tsx
│   │   ├── lib/
│   │   │   ├── api/                 # Axios clients + interceptors
│   │   │   ├── db/                  # Dexie offline DB
│   │   │   ├── offline/             # Offline sync logic
│   │   │   ├── stores/              # Zustand stores
│   │   │   ├── api.ts               # Base API config
│   │   │   ├── calendar-utils.ts    # Ethiopian calendar helpers
│   │   │   ├── ethiopian-calendar.ts
│   │   │   ├── grade-system.ts      # Grading utilities
│   │   │   ├── finance-labels.ts    # Finance display helpers
│   │   │   ├── timetable.ts         # Timetable utils
│   │   │   ├── student-code.ts      # Code generation
│   │   │   ├── siren-audio.ts       # Bell sound player
│   │   │   ├── query-keys.ts        # TanStack Query keys
│   │   │   ├── themeStore.ts        # Theme state
│   │   │   ├── languageStore.ts     # i18n state
│   │   │   ├── uiStore.ts           # UI state
│   │   │   ├── notification-display.ts
│   │   │   ├── push-notifications.ts
│   │   │   ├── school-resolver.ts   # Current school context
│   │   │   ├── sanitize.ts          # Input sanitization
│   │   │   ├── utils.ts             # Shared utilities
│   │   │   └── version.ts           # App version
│   │   └── messages/                # i18n translation files (en, am, ar, om, so)
│   └── ...
├── docker-compose.yml               # Production stack
├── docker-compose.dev.yml           # Dev stack (hot reload)
├── nginx/                           # Reverse proxy config
└── docs/                            # Documentation
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` / `start:dev` | Start with hot reload |
| `npm run build` | Production build |
| `npm run test` | Run tests |
| `npx tsc --noEmit` | Type check |
| `npm run prisma:seed` | Seed database |
| `npm run lint` | ESLint |

---

## Screenshots

![Admin Dashboard](admin.png)  ![Finance](finance.png)
![Parent Portal](parent.png)  ![Registrar](registrar.png)
![Teacher Leaderboard](teacherleaderboard.png)

## License

MIT
