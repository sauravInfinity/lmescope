# Life Made Easier (LME) — Agent Context

## Project Overview
Secure document management application for UK consumers. Store, manage, and receive renewal reminders for important personal documents. MVP v1.0 scope is frozen.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Mobile | React Native (single codebase for iOS + Android) |
| Backend | NestJS |
| Database | PostgreSQL |
| Storage | AWS S3 (eu-west-2, AES-256 encryption) |
| Auth | JWT, Google Sign-In, Apple Sign-In, biometric (Face ID/fingerprint) |
| Push | APNs / FCM |
| Email | SendGrid |
| Subscriptions | RevenueCat |
| AI | Rule-based only (no ML/LLM/OCR in v1.0) |

## Architecture (High-Level)
```
Mobile App (React Native)  ──►  Backend API (NestJS)  ──►  PostgreSQL + S3
       │                              │
  Family Sharing ◄────────►  Rule-based AI layer (geo, renewal, gap)
                                   Admin Portal (analytics, KB editing)
```

## MVP v1.0 — In Scope
- **Auth:** Email signup/login, forgot password, Google/Apple login, biometric, logout
- **Onboarding:** Welcome screens, category selection, first upload, first reminder, permissions flow
- **Profile:** Edit name, DOB, country (UK default), notification settings
- **Document Management:** Upload via camera/file picker, metadata (name, issue/expiry date, notes), view/download/delete (30-day soft delete), full-text search, 7 fixed categories (Vehicle, Home, Health, Finance, Identity, Family, Work + Other), completeness score, expiry colour coding
- **Dashboard:** Overall completeness ring, per-category completeness, recent docs, expiry dashboard, quick-add FAB, AI suggestion card
- **Family Sharing:** Invite up to 4 members, private document spaces, permission management, family hub, shared notifications
- **Notifications:** Push, email (fallback), in-app centre, configurable reminders (90/60/30/7 day)
- **Subscription:** Free (1 GB storage), Individual (£4–5/mo), Family (£7–9/mo), monthly/annual billing, RevenueCat
- **AI (rule-based):** Geo-triggered notifications, renewal knowledge base, document gap detector (if X → suggest Y)

## MVP v1.0 — Out of Scope (Phase 2)
OCR, AI photo scanning, chatbot/LLM, web portal, dark mode, custom categories, multi-user/business accounts, university/NHS/DVLA integration, auto document import, desktop app, multi-language, offline mode, estate planning, will management.

## Security Baseline
- TLS 1.3 in transit
- AES-256 at rest
- JWT authentication
- Soft delete (30 days)
- Immutable audit logs
- GDPR compliance
- Data export & account deletion

## Key Assumptions
- English only, UK only
- Mobile-first (no tablet-specific UI)
- Max 4 family members
- No admin access to user documents
- Single AWS region (eu-west-2)
- 7 fixed categories + Other
- Free tier: 1 GB storage

## Coding Guidelines
- Follow existing patterns — check neighboring files before adding dependencies
- Mimic code style, use existing libraries and utilities
- Security: never expose or log secrets/keys; never commit secrets
- No comments unless code is non-obvious
- Use existing testing approach — check README or `package.json` for test commands
- Before committing: run linter and typecheck (ask for commands if unknown)
