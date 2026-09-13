# ChatForge

> Edge-native AI chat reference implementation — a single Cloudflare Worker serving a streaming SSE chat UI powered by Workers AI, with no origin server and no API key to manage.

[![License](https://img.shields.io/github/license/OneByJorah/ChatForge?style=for-the-badge&color=FFB300&labelColor=0a0a09)](https://github.com/OneByJorah/ChatForge)
[![Top Language](https://img.shields.io/github/languages/top/OneByJorah/ChatForge?style=for-the-badge&color=FFB300&labelColor=0a0a09)](https://github.com/OneByJorah/ChatForge)
[![Stars](https://img.shields.io/github/stars/OneByJorah/ChatForge?style=for-the-badge&color=FFB300&labelColor=0a0a09)](https://github.com/OneByJorah/ChatForge/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/OneByJorah/ChatForge?style=for-the-badge&color=FFB300&labelColor=0a0a09)](https://github.com/OneByJorah/ChatForge/commits)

![ChatForge chat UI](.github/screenshots/main.png)
[![CI](https://img.shields.io/github/actions/workflow/status/OneByJorah/ChatForge/ci.yml?style=for-the-badge&color=FFB300&labelColor=0a0a09&label=ci)](https://github.com/OneByJorah/ChatForge/actions/workflows/ci.yml)

![ChatForge UI](docs/screenshots/chatforge-ui.png)

## What This Is

ChatForge is a reference implementation of an edge-hosted chat app: a static frontend plus a streaming `/api/chat` endpoint, both running inside one Cloudflare Worker and calling Workers AI through a binding. There is no backend server, no API key, and no regional infrastructure — just a clean starting point to fork and extend. It is intentionally minimal: no authentication, no persistence, no rate limiting; chat history lives in browser memory and resets on refresh. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the production upgrade path.

## Quick Start

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install && npx wrangler login
npm run dev
```

Open **http://localhost:8787**. Run `npm run deploy` to publish to Cloudflare Workers.

## Features

- Workers AI inference with `@cf/meta/llama-3.1-8b-instruct-fp8` at the edge.
- Server-Sent Events streaming — tokens arrive as they are generated.
- Single-Worker deploy: frontend and API ship together with one `wrangler deploy`.
- Framework-free vanilla HTML/CSS/JS frontend.
- Security headers on every response: CSP, HSTS, `X-Frame-Options`, `nosniff`, referrer and permissions policies.
- Server-side input limits on message shape, count (max 100), and length (max 32,000 chars).
- Swappable model via `MODEL_ID` in `src/index.ts`.
- Docker preview of the static UI with `docker compose up` (the `/api/chat` endpoint requires `wrangler dev` or a deployed Worker for the AI binding).

## Architecture

```
Browser ──SSE──▶ Cloudflare Worker (src/index.ts)
                     │
                     ├── GET /* ──▶ env.ASSETS.fetch() ──▶ public/ (static)
                     │
                     └── POST /api/chat ──▶ env.AI.run() ──▶ Workers AI
                                                 │
                                                 └── text/event-stream response
```

Chat history is kept in browser memory only; the Worker is stateless.

## Stack

Cloudflare Workers · Workers AI · TypeScript · vanilla HTML/CSS/JS · Server-Sent Events · Wrangler · Vitest · Docker (nginx:alpine preview).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). [Open an issue](https://github.com/OneByJorah/ChatForge/issues) or a pull request.

## License

MIT — see [LICENSE](LICENSE).
