# ChatWave

ChatWave is a production-quality WhatsApp-inspired messaging platform built with Next.js 16 App Router, TypeScript, Prisma, PostgreSQL, Redis, Socket.IO, Tailwind CSS, and a secure production-ready architecture.

## Status

This repository now includes:
- a clean Next.js app layout and feature shell
- Prisma schema for the core domain model
- local environment configuration and Docker Compose setup
- a task plan for the staged implementation
- initial auth, direct messaging, realtime delivery, and media upload scaffolding

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Redis + Socket.IO
- MinIO/S3-compatible storage
- Zod validation
- Vitest + Playwright

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local infrastructure:
   ```bash
   docker compose up -d postgres redis minio
   ```
3. Copy and adjust environment variables:
   ```bash
   cp .env.example .env
   ```
4. Generate Prisma artifacts and push schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Seed demo users and conversation data:
   ```bash
   npx tsx prisma/seed.ts
   ```
6. Run the app:
   ```bash
   npm run dev
   ```

## Core routes

- `/` – dashboard and chat shell
- `/login` – OTP-based onboarding mock flow
- `/api/auth/request-otp` – request demo OTP
- `/api/auth/verify-otp` – confirm OTP and issue a session token
- `/api/messages` – message history and send endpoint
- `/api/uploads` – upload and validation scaffold for media

## Architecture notes

The app is organized in a clean, layered structure:
- `app/` for routes and API handlers
- `components/` for reusable UI blocks
- `lib/` for shared utilities and Prisma access
- `server/` for realtime Socket.IO logic
- `prisma/` for schema and seed data
- `docs/` for the implementation roadmap

## Security model

The project is designed with secure defaults in mind: httpOnly session cookies, validation with Zod, authorization-aware server routes, and environment-driven secrets. End-to-end encryption is a documented later-phase requirement and should be added with a clear library choice and constraints review.

## Next milestone

The next implementation phase will focus on:
- complete auth middleware and protected route enforcement
- real database-backed message persistence and conversation APIs
- Socket.IO room management and typing indicators for direct chats
- media storage integration with MinIO and signed URLs
- richer chat UI states and persistence workflows
