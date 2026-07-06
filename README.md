<!-- j1-brand:v2 -->
<div align="center">

# ChatForge

A lightweight, edge-native AI chat application that runs entirely on Cloudflare Workers — zero cold starts, zero origin servers, real-time streaming.

[![GitHub](https://img.shields.io/badge/github-OneByJorah%2FChatForge-FFB300?style=for-the-badge&labelColor=0d0d0c)](https://github.com/OneByJorah/ChatForge)
[![License](https://img.shields.io/badge/license-MIT-FFB300?style=for-the-badge&labelColor=0d0d0c)](LICENSE)
[![Language](https://img.shields.io/badge/TypeScript-FFB300?style=for-the-badge&labelColor=0d0d0c)](https://typescriptlang.org)
[![Built by](https://img.shields.io/badge/built%20by-JorahOne%20LLC-FFB300?style=for-the-badge&labelColor=0d0d0c)](https://github.com/OneByJorah)

</div>

---

## Why This Exists

Most AI chat apps bolt a UI onto a VPS and call it done. ChatForge takes a different approach: it lives at the edge on Cloudflare Workers, using Workers AI for inference and Durable Objects for state — so conversations start instantly, scale to zero when idle, and never need you to manage a server.

## Key Features

| Feature | Why It Matters |
|---|---|
| Edge-native architecture | No origin server — browser talks directly to Cloudflare Workers |
| Real-time token streaming | Responses arrive character-by-character as the model generates |
| Zero cold starts | Workers AI keeps models warm; no spin-up delay |
| Minimal codebase | ~500 lines of TypeScript — easy to read, fork, and extend |
| Wrangler CLI | One command to deploy (`npm run deploy`), one to develop locally (`npm run dev`) |

## Quick Start

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npm run dev     # local development with wrangler
npm run deploy  # deploy to your Cloudflare account
```

## Project Structure

```
src/          — Worker source code (TypeScript)
public/       — Static assets (vanilla JS frontend)
wrangler.jsonc — Cloudflare Workers configuration
```

## Documentation

| Doc | Description |
|---|---|
| [Development Guide](docs/development.md) | Local setup, wrangler config, and testing |
| [Deployment Guide](docs/deployment.md) | Deploying to Cloudflare and configuring Workers AI |

---

## License

MIT © JorahOne, LLC — see [LICENSE](LICENSE)

<sub>Part of the JorahOne infrastructure ecosystem.</sub>
