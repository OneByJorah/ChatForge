<div align="center">
  <img src="https://img.shields.io/badge/Cloudflare%20Workers- F38020?style=for-the-badge&logo=cloudflare&logoColor=white">
  <img src="https://img.shields.io/badge/WebSocket-4CAF50?style=for-the-badge&logo=socket.io&logoColor=white">
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</div>

<br>

<div align="center">
  <h1>ChatForge</h1>
  <p><strong>AI-Powered Chat Interface</strong></p>
  <p>Multi-model support, real-time WebSocket streaming, and conversation management.</p>
  <p>
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## Screenshot

![ChatForge Interface](docs/screenshot.png)
*AI-powered chat interface with multi-model support and real-time streaming.*

## Features

- **Multi-Model Support** — OpenAI GPT-4/3.5, Anthropic Claude, and local Ollama models.
- **Real-Time Streaming** — WebSocket-based live response streaming.
- **Conversation Management** — Create, save, and switch between chat sessions.
- **User Authentication** — Secure login with session management.
- **Dark/Light Themes** — Customizable interface themes.
- **Markdown Rendering** — Full markdown support with syntax highlighting.
- **Code Execution** — Run code snippets directly in the chat.
- **Cloudflare Workers** — Deploy to the edge for global low-latency access.
- **Docker Support** — Self-host with Docker Compose.

## Quick Start

### Cloudflare Workers (Recommended)

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge

# Configure your API keys
cp wrangler.toml.example wrangler.toml
# Edit wrangler.toml with your keys

npm install
npm run deploy
```

### Docker Self-Host

```bash
docker compose up -d
```

Open **http://localhost:3000** in your browser.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | *(empty)* | OpenAI API key |
| `ANTHROPIC_API_KEY` | *(empty)* | Anthropic API key |
| `OLLAMA_URL` | `http://localhost:11434` | Ollama API endpoint |
| `JWT_SECRET` | *(empty)* | Secret for JWT authentication |
| `DATABASE_URL` | — | Database for conversation storage |
| `PORT` | `3000` | Server port (Docker mode) |

## Architecture

```
Browser ──WebSocket──▶ Cloudflare Worker / Node.js
                          │
                          ├──▶ OpenAI API
                          ├──▶ Anthropic API
                          ├──▶ Ollama (local)
                          └──▶ D1/KV Storage
```

## Tech Stack

- **Runtime**: Cloudflare Workers (edge) or Node.js
- **Frontend**: Vanilla JS with WebSocket
- **AI Providers**: OpenAI, Anthropic, Ollama
- **Storage**: Cloudflare D1/KV or SQLite
- **Auth**: JWT-based authentication
- **Deployment**: Cloudflare Workers, Docker, VPS

## Supported Models

| Provider | Models |
|----------|--------|
| **OpenAI** | GPT-4, GPT-4 Turbo, GPT-3.5 Turbo |
| **Anthropic** | Claude 3 Opus, Claude 3 Sonnet, Claude 2 |
| **Ollama** | Llama 2, Mistral, CodeLlama, and more |

## Project Structure

```
ChatForge/
├── src/
│   ├── index.js           # Worker entry point
│   ├── chat.js            # Chat handler
│   ├── auth.js            # Authentication
│   └── models.js          # AI model integrations
├── public/
│   ├── index.html         # Chat interface
│   ├── app.js             # Frontend logic
│   └── styles.css         # Theme styles
├── docker-compose.yml     # Docker deployment
├── wrangler.toml          # Cloudflare Workers config
└── .env.example           # Configuration template
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send message and get response |
| `/api/chat/stream` | POST | Stream response via WebSocket |
| `/api/conversations` | GET | List user conversations |
| `/api/conversations/:id` | GET | Get conversation history |
| `/api/auth/login` | POST | User login |
| `/api/auth/register` | POST | User registration |

## Contributing

Contributions are welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community standards.

## Security

For security concerns, see [SECURITY.md](SECURITY.md). Please report vulnerabilities to **info@jorahone.com** — do not use public issues.

## License

MIT © Jhonattan L. Jimenez

---

<div align="center">
  <p>AI-powered chat interface for the modern web.</p>
  <p><a href="https://github.com/OneByJorah">@OneByJorah</a></p>
</div>
