<div align="center">

# ChatForge

**AI-Powered Chat Interface** — Edge-native, real-time streaming conversations on Cloudflare Workers AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=fff)](https://workers.cloudflare.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=fff)](docker-compose.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen)](CONTRIBUTING.md)

</div>

<p align="center">
  <img src="docs/screenshots/chatforge-ui.png" alt="ChatForge UI" width="90%">
</p>

---

## Overview

ChatForge is a lightweight, edge-deployed AI chat interface powered by **Cloudflare Workers AI** (Llama 3.1 8B Instruct). The entire app — static frontend and streaming chat API — runs in a single Cloudflare Worker with Server-Sent Events (SSE) streaming and no backend server.

### Why ChatForge?

| Feature | ChatForge | Typical Alternatives |
|---------|-----------|----------------------|
| **Deployment** | Single edge Worker, one command | Multi-service stacks |
| **Backend** | None required (Workers AI binding) | API servers + keys |
| **Streaming** | Real-time SSE | Polling-based |
| **Cold Starts** | None | Regional servers |

## Features

- **Cloudflare Workers AI** — Llama 3.1 8B Instruct (FP8) inference at the edge
- **Real-Time Streaming** — Server-Sent Events (SSE) for instant response delivery
- **Single-Worker Deploy** — Frontend + API in one `wrangler deploy`
- **Markdown-Free Simplicity** — Vanilla HTML/CSS/JS frontend, zero framework overhead
- **Security Headers** — CSP, HSTS, X-Frame-Options, nosniff, referrer/permissions policy
- **Input Validation** — Message shape/count/length limits enforced server-side
- **Docker Preview** — Run the static UI locally with `docker compose up` for a quick look

> **Note:** ChatForge is a reference implementation / starter template. It intentionally has **no authentication, no persistence, and no rate limiting** — see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the upgrade path.

## Quick Start

### Cloudflare Workers (Edge)

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npx wrangler login
npm run deploy
```

The Workers AI binding requires **no API keys** — inference is billed to your Cloudflare account. For local development:

```bash
npm run dev   # http://localhost:8787
```

### Docker (Static UI Preview)

```bash
./install.sh          # or install.ps1 on Windows — installs Node deps and starts dev
# OR, for a static preview with no Cloudflare account:
docker compose up -d  # http://localhost:8787
```

> The Docker image only previews the static frontend; the `/api/chat` endpoint requires `wrangler dev` or a deployed Worker because it depends on the `env.AI` binding.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Cloudflare Workers |
| **Frontend** | Vanilla HTML/CSS/JS (no framework) |
| **AI Provider** | Cloudflare Workers AI (`@cf/meta/llama-3.1-8b-instruct-fp8`) |
| **Streaming** | Server-Sent Events (SSE) |
| **Storage** | None (chat history lives in browser memory) |
| **Auth** | None (add Cloudflare Access for production) |
| **Container** | nginx:alpine for static previews |

## Screenshots

| Chat Interface |
|:--:|
| <img src="docs/screenshots/chatforge-ui.png" alt="ChatForge UI" width="100%"> |

> The screenshot above shows the static UI preview. Live AI responses require the Cloudflare Workers AI binding.

## Environment Variables

No runtime secrets are needed — the AI binding is configured in [`wrangler.jsonc`](wrangler.jsonc). Deployment credentials (set as environment variables or Wrangler secrets, never committed):

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOUDFLARE_API_TOKEN` | For deploy | Cloudflare API token (Wrangler deployment) |
| `CLOUDFLARE_ACCOUNT_ID` | For deploy | Cloudflare account ID |

See [.env.example](.env.example).

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | `POST` | Send messages, receive SSE-streamed response |
| `/*` (any non-API path) | `GET` | Static frontend from `public/` |

Errors: `400` invalid JSON/messages, `405` wrong method, `404` unknown route, `500` AI failure. Full details in [docs/API.md](docs/API.md).

## Project Structure

```
ChatForge/
├── src/                # Cloudflare Worker source
│   ├── index.ts        # Main entry with routing + chat API
│   ├── types.ts        # TypeScript type definitions
│   └── __tests__/      # Vitest test suite
├── public/             # Frontend assets
│   ├── index.html      # Chat interface
│   └── chat.js         # Frontend SSE logic
├── scripts/            # Utility scripts
├── docs/               # Documentation & assets
│   ├── screenshots/    # App screenshots
│   └── API.md          # Full API documentation
├── wrangler.jsonc      # Cloudflare config
├── Dockerfile          # Static UI preview image
├── docker-compose.yml  # Local static preview
├── install.sh          # macOS/Linux dev installer
├── install.ps1         # Windows dev installer
└── package.json
```

## Architecture

```
Browser ──SSE──▶ Cloudflare Worker (src/index.ts)
                     │
                     ├── GET /* ──▶ env.ASSETS.fetch() ──▶ public/ (static files)
                     │
                     └── POST /api/chat ──▶ env.AI.run() ──▶ Workers AI (Llama 3.1 8B)
                                                 │
                                                 └── text/event-stream response
```

Chat history is kept in browser memory only and resets on refresh.

## Supported Models

| Provider | Model |
|----------|-------|
| **Cloudflare Workers AI** | `@cf/meta/llama-3.1-8b-instruct-fp8` (default, swappable via `MODEL_ID` in [src/index.ts](src/index.ts)) |

Browse the full catalog at the [Workers AI models page](https://developers.cloudflare.com/workers-ai/models/) — any text-generation model ID can be dropped in.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community standards.

## Security

Found a vulnerability? Please report to **security@example.com** per [SECURITY.md](SECURITY.md) — do not use public issues.

## License

[MIT](LICENSE) © Jhonattan L. Jimenez (OneByJorah)

---

<p align="center">
  <a href="https://github.com/OneByJorah">OneByJorah</a>
  ·
  <a href="https://github.com/OneByJorah/ChatForge/issues">Issues</a>
  ·
  <a href="docs/API.md">API Docs</a>
  ·
  <a href="CHANGELOG.md">Changelog</a>
</p>
