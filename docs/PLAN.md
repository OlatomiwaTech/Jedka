# ChatWave implementation plan

## Milestone 1: foundation and core messaging

### Repository structure
- `app/` – App Router pages and API routes.
- `components/` – reusable UI for chat shells, message composer, and auth screens.
- `lib/` – app utilities, Prisma client, and shared helpers.
- `server/` – realtime Socket.IO handlers and server-side integration logic.
- `prisma/` – Prisma schema, migrations, and seed data.
- `docs/` – planning and architecture notes.

### Phase plan
1. Bootstrap the Next.js App Router project and enable Tailwind, Prisma, and the project tooling.
2. Create the data model for users, conversations, messages, status, media, calls, and business records.
3. Add environment configuration, Docker Compose services, and a backend-ready security baseline.
4. Implement onboarding/auth and protected route patterns.
5. Build the direct-message flow and realtime delivery layer.
6. Extend with media uploads and basic attachments.
7. Add group/community, Status, and calls in later phases.
8. Finish with testing, CI, and deployment documentation.

### First milestone goals
- Signed-in user flow with OTP-style mock auth.
- Direct conversation UI and API endpoints.
- Realtime typing and message delivery over Socket.IO.
- Media upload API with safe validation and storage placeholders.
- Prisma schema ready for the next feature expansion.

## Notes
- This repository starts with a production-ready app structure and a domain model designed to scale.
- The code intentionally focuses on the first incremental milestone: auth, direct messaging, realtime delivery, and media handling.
- Advanced features such as WebRTC calls, business inbox, and communities are left for the later phases requested in the original brief.
