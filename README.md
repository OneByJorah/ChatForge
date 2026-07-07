<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white">
  <img src="https://img.shields.io/badge/Workers%20AI-000?style=for-the-badge&logo=cloudflareworkers&logoColor=white">
</div>

<br>

<div align="center">
  <h1>💬 ChatForge</h1>
  <p><strong>Lightweight, Edge-Native AI Chat Application</strong></p>
  <p>Zero cold-start serverless chat — Cloudflare Workers AI-powered streaming responses</p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-development">Development</a>
  </p>
</div>

---

## ✨ Features

- **Edge-Native** — Runs entirely on Cloudflare Workers, zero cold-start serverless
- **Streaming Responses** — Real-time token delivery via streaming
- **No Origin Server** — Browser communicates directly with the Worker
- **Minimal Footprint** — Tiny codebase, fast deploys
- **TypeScript** — Type-safe, modern codebase
- **Workers AI** — Leverages Cloudflare's global AI inference network

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Cloudflare account with Workers enabled
- Wrangler CLI (`npm install -g wrangler`)

### Installation

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npm run dev
```

### Deploy

```bash
# 1. Copy and fill in your Cloudflare credentials
cp .env.example .env
# Edit .env with your CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID

# 2. Authenticate with Cloudflare (if not already done)
npx wrangler login

# 3. Deploy to Cloudflare Workers
npm run deploy
```

> **Note:** ChatForge is a serverless Cloudflare Workers application and does **not** use Docker. It runs on Cloudflare's global edge network with zero cold starts. See [wrangler.jsonc](./wrangler.jsonc) for the full configuration.

## 🏗️ Architecture

```
ChatForge/
├── src/
│   ├── index.ts             # Worker entry point & request handler
│   └── types.ts             # TypeScript type definitions
├── public/                  # Static assets
│   └── ...                  # HTML/CSS/JS frontend
├── docs/                    # Documentation
├── wrangler.jsonc           # Cloudflare Worker configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies & scripts
└── worker-configuration.d.ts
```

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start local development server |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run test` | Run tests with Vitest |
| `npm run check` | TypeScript check + dry-run deploy |

## 📡 Technology Stack

- **Runtime:** Cloudflare Workers (JavaScript/TypeScript)
- **AI:** Workers AI (Cloudflare's global inference)
- **Frontend:** HTML5 + JavaScript (vanilla)
- **Testing:** Vitest + @cloudflare/vitest-pool-workers
- **Deployment:** Wrangler CLI

## 📄 License

MIT © Jhonattan L. Jimenez

---

<div align="center">
  <p>⚡ Edge-native AI chat — zero servers, zero cold starts</p>
  <p><a href="https://github.com/OneByJorah">@OneByJorah</a></p>
</div>
