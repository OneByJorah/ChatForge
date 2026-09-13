<div align="center">

![ChatForge](docs/assets/banner.svg)

# ChatForge

**AI-powered chat interface — multi-model (OpenAI, Anthropic, Ollama), real-time WebSocket streaming, conversations**

[![GitHub release](https://img.shields.io/github/v/release/OneByJorah/ChatForge?color=e0aaff&label=release&logo=github)](https://github.com/OneByJorah/ChatForge/releases)
[![npm version](https://img.shields.io/npm/v/@jorahone/chatforge?color=e0aaff&label=npm&logo=npm)](https://www.npmjs.com/package/@jorahone/chatforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=FFB300&logo=open-source-initiative&logoColor=FFB300)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-007ACC?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)

</div>

![ChatForge chat interface](docs/assets/screenshot.png)

## What This Is

ChatForge is an AI-powered chat interface with multi-model support (OpenAI, Anthropic, Ollama), designed as a self-hosted, real-time conversation platform. It features WebSocket streaming for live LLM responses, conversation history management, and flexible model selection — all contained in a Docker Compose deployment.

Built for developers and teams who want to self-host their chat interface with full control over the underlying LLMs and data.

## Quick Start

### Docker (recommended)

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
cp .env.example .env
docker compose up -d
```

Open **http://localhost:5173** in your browser.

### npm

```bash
npm install @jorahone/chatforge
```

Then import and use in your project:

```javascript
import { ChatForge } from '@jorahone/chatforge';
```

### From Source

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npm run dev
```

## Installation

### npm

```bash
npm install @jorahone/chatforge
```

Then import and use in your project:

```javascript
import { ChatForge } from '@jorahone/chatforge';
```

### Docker

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
cp .env.example .env
docker compose up -d
```

### From Source

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
npm install
npm run dev
```

## Features

- **Multi-model support** — OpenAI, Anthropic, Ollama, and any OpenAI-compatible endpoint
- **Real-time WebSocket streaming** — live LLM responses as they are generated
- **Conversation management** — history, context, and session persistence
- **Model switching** — switch between LLMs on the fly
- **Custom system prompts** — configure the AI personality and behavior
- **Self-hosted** — fully deployable via Docker Compose, no cloud dependencies
- **Responsive UI** — works on desktop and mobile browsers

## Tech Stack

- **Frontend** — React 18, TypeScript, Vite, WebSocket
- **Deployment** — Docker Compose, environment variables
- **LLMs** — OpenAI API, Anthropic API, Ollama (local), OpenAI-compatible endpoints

## Configuration

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key (optional) |
| `ANTHROPIC_API_KEY` | Anthropic API key (optional) |
| `OLLAMA_URL` | Ollama endpoint (default: http://localhost:11434) |
| `DEFAULT_MODEL` | Default LLM to use |
| `PORT` | Application port (default: 5173) |

## Package Badges

[![GitHub release](https://img.shields.io/github/v/release/OneByJorah/ChatForge?color=e0aaff&label=release&logo=github)](https://github.com/OneByJorah/ChatForge/releases)
[![npm version](https://img.shields.io/npm/v/@jorahone/chatforge?color=e0aaff&label=npm&logo=npm)](https://www.npmjs.com/package/@jorahone/chatforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=FFB300&logo=open-source-initiative&logoColor=FFB300)](https://opensource.org/licenses/MIT)

## Contributing

Contributions are welcome. [Open an issue](https://github.com/OneByJorah/ChatForge/issues) to report a bug or request a feature.

## License

MIT — see [LICENSE](LICENSE).
