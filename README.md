# ChatForge

AI-powered chat interface and conversation management platform — multi-model support with real-time WebSocket streaming.

![status](https://img.shields.io/badge/status-active-FFB300?style=flat-square)
![language](https://img.shields.io/badge/python+typescript-0d0d0c?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-FFB300?style=flat-square)

## Overview

ChatForge is a self-hosted AI chat platform with a FastAPI backend, React frontend, and real-time WebSocket streaming. It supports OpenAI, Anthropic, Ollama, and custom LLM endpoints through a unified interface. Designed for teams that want a ChatGPT-like experience on their own infrastructure without sending data to third parties.

## Features

- Multi-model support — OpenAI, Anthropic, Ollama, and custom endpoints
- Real-time streaming responses via WebSocket
- Conversation management — save, search, and organize chat history
- JWT-based user authentication and authorization
- Dark/Light mode with customizable UI themes
- Usage analytics and token tracking
- Docker Compose deployment
- Cloudflare Workers deployment option (wrangler.jsonc)

## Architecture / Tech Stack

- **Backend**: FastAPI (Python), WebSocket
- **Frontend**: React (TypeScript), Vite
- **Auth**: JWT tokens
- **AI Providers**: OpenAI, Anthropic, Ollama (pluggable)
- **Deployment**: Docker Compose, Cloudflare Workers (wrangler)
- **Database**: SQLite / D1 (Cloudflare)

## Installation

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge

# Docker deployment
cp .env.example .env  # Add your API keys
docker compose up -d

# Or local development
npm install
npm run dev
```

## Usage

1. Configure your LLM API keys in `.env`
2. Open the web UI at `http://localhost:3000`
3. Select a model and start chatting
4. Conversations are saved and searchable

## Configuration

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `OLLAMA_URL` | Ollama endpoint (default: `http://localhost:11434`) |

See `.env.example` for full options.

## License

MIT — see [LICENSE](LICENSE).

---
Part of the JorahOne / J1 ecosystem — self-hosted AI chat for teams that own their data.
