# ChatApp Microservice Scaffold

This repository contains scaffolded Node.js/TypeScript microservices for a scalable, event-driven chat platform. Each service currently boots with Express (or Socket.IO for the WebSocket service), health checks, configuration loading, logging, Dockerfiles, and example environment files. Feature work (authentication flows, real-time messaging, persistence, search, notifications, etc.) is **not yet implemented**—see `STATUS.md` for the roadmap.

## Microservices
- **api-gateway**: Entry point, routing, future auth/rate limits.
- **auth-service**: Authentication, JWT/refresh, OTP, sessions (to be implemented).
- **chat-ws-service**: Socket.IO server for real-time chat and presence.
- **message-persistence-service**: Kafka consumer to persist messages.
- **group-service**: Group/channel management.
- **media-upload-service**: Signed URLs and metadata storage.
- **notification-service**: Push notification delivery.
- **search-service**: Full-text search over users/messages/groups.
- **analytics-service**: Usage metrics and insights.
- **admin-service**: Admin APIs and moderation surface.
- **background-worker**: Job/cron runner for async work.
- **user-profile-service**: Profile storage and preferences.

## Prerequisites
- Node.js 18+
- npm (ships with Node)
- Docker (for container builds; full Compose/K8s wiring not yet added)

## Quick Start (local, per-service)
1. Clone the repository and switch to it:
   ```bash
   git clone <repo-url>
   cd ChatAppMicroService
   ```
2. Create environment files:
   - Copy the root `example.env` to `.env` for shared defaults:
     ```bash
     cp example.env .env
     ```
   - For each service you run, copy its `.env.example` to `.env` inside that service directory and adjust values (ports, secrets, broker URLs):
     ```bash
     cp auth-service/.env.example auth-service/.env
     ```
3. Install dependencies and start a service in dev mode (repeat per service you want to run):
   ```bash
   cd auth-service
   npm install
   npm run dev
   ```
   Each service exposes an HTTP health endpoint at `/health` on its configured port.

## Building & Running with Docker
Each service contains a `Dockerfile` suitable for production builds. Example for the auth service:
```bash
cd auth-service
docker build -t chatapp/auth-service:dev .
docker run --env-file .env -p 3001:3001 chatapp/auth-service:dev
```
A full `docker-compose.yml` is not present yet; add one when wiring shared infra (PostgreSQL, Redis, Kafka, MinIO).

## Development Notes
- Code style: TypeScript ES modules with strict linting (see `package.json` scripts).
- Logging: Pino logger initialized per service.
- Error handling: Basic Express error middleware is in place; extend with domain-specific errors.
- Database: Prisma schema is defined at `prisma/schema.prisma`, but migrations and per-service Prisma clients are not wired yet.
- Messaging: Kafka topics are defined in the architecture plan; producers/consumers are not yet implemented.

## Project Status
See `STATUS.md` for the detailed checklist of remaining steps (authentication features, WebSocket flows, persistence workers, search, notifications, tests, Docker Compose, CI/CD, and docs).

## Contributing
- Open an issue or PR for any feature from the status checklist.
- Keep services independently runnable with clear environment contracts.
- Add tests (`npm test`) alongside new features where applicable.
