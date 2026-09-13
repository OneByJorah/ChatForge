<div align="center">

![ChatForge](docs/assets/banner.svg)

# ChatForge

**Edge-native AI chat interface — single Cloudflare Worker, Workers AI, streaming SSE, no origin server**

[![GitHub release](https://img.shields.io/github/v/release/OneByJorah/ChatForge?color=3178C6&label=release&logo=github)](https://github.com/OneByJorah/ChatForge/releases)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/)
[![Workers AI](https://img.shields.io/badge/Workers%20AI-8B8CFF?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers-ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=FFB300&logo=open-source-initiative&logoColor=FFB300)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![SSE Streaming](https://img.shields.io/badge/SSE-6366f1?style=flat-square&logo=socket.io&logoColor=white)](https://html.spec.whatwg.org/multipage/networking.html#server-sent-events)

</div>

![ChatForge screenshot](docs/assets/screenshot.png)

## What This Is

ChatForge is a reference implementation of an edge-hosted chat application: a static frontend plus a streaming `/api/chat` endpoint, both running inside a single Cloudflare Worker and calling Workers AI through a binding. There is no backend server, no API key to manage, and no cold-start regional infrastructure.

Built for developers who want a clean starting point to fork and extend for their own product.

> [!NOTE]
> ChatForge is intentionally minimal: **no authentication, no persistence, and no rate limiting**. Chat history lives in browser memory and resets on refresh. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the production upgrade path.

## Quick Start

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npx wrangler login
npm run dev
```

Open **http://localhost:8787**. Run `npm run deploy` to publish to Cloudflare Workers.

## Install

### From npm

```bash
npm install chatforge
```

### From Source

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npm run dev
```

### Docker (local preview)

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
docker compose up
```

### Cloudflare Workers (production)

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npx wrangler login
npm run deploy
```

## Features

- **Workers AI inference** — `@cf/meta/llama-3.1-8b-instruct-fp8` at the edge, no API keys needed
- **Real-time SSE streaming** — tokens delivered as they are generated
- **Single-Worker deploy** — frontend + API with one `wrangler deploy`
- **Framework-free frontend** — vanilla HTML/CSS/JS, ~5.65 KiB gzipped
- **Security headers** — CSP, HSTS, `X-Frame-Options`, `nosniff`, referrer, permissions policy
- **Input validation** — message shape, count (max 100), length (max 32,000 chars)
- **Swappable model** — change `MODEL_ID` in `src/index.ts` to any Workers AI text-generation model
- **Docker preview** — serve static UI locally with `docker compose up`

## Tech Stack

- **Runtime** — Cloudflare Workers
- **AI** — Workers AI (`@cf/meta/llama-3.1-8b-instruct-fp8`)
- **Frontend** — Vanilla HTML/CSS/JavaScript, SSE
- **Deployment** — `wrangler deploy`, Docker Compose for local preview
- **Config** — `wrangler.jsonc` (compatibility date 2025-10-08, nodejs_compat, global_fetch_strictly_public)

## Package Badges

[![GitHub release](https://img.shields.io/github/v/release/OneByJorah/ChatForge?color=3178C6&label=release&logo=github)](https://github.com/OneByJorah/ChatForge/releases)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=FFB300&logo=open-source-initiative&logoColor=FFB300)](https://opensource.org/licenses/MIT)

## Configuration

Edit `wrangler.jsonc` to customize:

| Setting | Description |
|---------|-------------|
| `name` | Worker name (default: `chatforge`) |
| `main` | Entry point (default: `src/index.ts`) |
| `compatibility_date` | Workers compatibility date |
| `assets.directory` | Static frontend directory (default: `./public`) |
| `ai.binding` | Workers AI binding (default: `AI`) |

Environment variables (set via `wrangler secret` or `.dev.vars`):

| Variable | Description |
|----------|-------------|
| `MODEL_ID` | Workers AI model ID (default: `@cf/meta/llama-3.1-8b-instruct-fp8`) |

## Architecture

```
Browser ──HTTPS──> Cloudflare Worker (src/index.ts)
                       │
                       ├── GET /* ──▶ env.ASSETS.fetch() ──▶ public/ (static files)
                       │
                       └── POST /api/chat ──> env.AI.run() ──> Workers AI (Llama 3.1 8B)
                                                   │
                                                   └── stream ──> text/event-stream response
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full architecture details and upgrade path.

## API Reference

See [docs/API.md](docs/API.md) for the full API reference.

### `POST /api/chat`

Send a chat message and receive a streaming AI response.

**Request:**
```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:** `text/event-stream` — SSE stream with `data:` lines, ends with `data: [DONE]`

### `GET /` or any non-API path

Serves static frontend assets from the `public/` directory.

## Contributing

Contributions are welcome. [Open an issue](https://github.com/OneByJorah/ChatForge/issues) to report a bug or request a feature.

## License

MIT — see [LICENSE](LICENSE).
