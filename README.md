# LLM Chat App Template

[![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-blue?logo=flask)](https://flask.palletsprojects.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blue?logo=bootstrap)](https://getbootstrap.com/)
[![MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Maintained by OneByJorah](https://img.shields.io/badge/Maintained%20by-OneByJorah-1E90FF?logo=github)](https://github.com/OneByJorah)

![LLM Chat App Template Architecture](https://v3b.fal.media/files/b/0a9e59a6/3Cq6QvN0Qw5qZ7H7vJ0uK4yD9c0g8a.png)

> **LLM Chat App Template**: A professional, production-ready template for building LLM-powered chat applications with full-stack architecture, AI integration patterns, and comprehensive documentation.

---

## 📋 Overview

**LLM Chat App Template** is a professional, production-ready template for building LLM-powered chat applications. It features **complete full-stack architecture**, **AI integration patterns**, **conversational memory management**, **tool calling support**, **multi-model routing**, and **comprehensive documentation** — all designed to help developers rapidly build production-quality LLM chat applications with best practices built in.

> **Built with ❤️ by [OneByJorah](https://github.com/OneByJorah) for rapid LLM app development.**

---

## 🏗️ Architecture

### High-Level System Architecture

```mermaid
flowchart TB
    subgraph Frontend["Web UI / API"]
        WEB[Web Interface<br/>Flask + HTML/CSS/JS]
        API[REST API<br/>Flask Blueprint]
    end

    subgraph Services["Core Services"]
        CHAT[Chat Engine<br/>LLM Orchestration]
        MEMORY[Memory Mgmt<br/>Context + Retrieval]
        TOOLS[Tool Calling<br/>Function Execution]
        ROUTER[Model Router<br/>Multi-model Routing]
    end

    subgraph Data["Data Layer"]
        KB[(Vector DB<br/>RAG Indexing)]
        CACHE[(Redis<br/>Session State)]
        LOG[(SQLite<br/>Chat History)]
    end

    subgraph Integration["Integrations"]
        LANGCHAIN[LangChain<br/>AI Patterns]
        HF[HuggingFace<br/>Model Hub]
        ANTHROPIC[Anthropic<br/>Claude API]
    end

    subgraph Security["Security"]
        AUTH[Authentication<br/>JWT + OAuth2]
    end

    WEB <--> API
    API <--> CHAT
    API <--> MEMORY
    API <--> TOOLS
    API <--> ROUTER
    CHAT <--> MEMORY
    MEMORY <--> KB
    CHAT <--> CACHE
    CHAT <--> LOG
    API <--> LANGCHAIN
    ROUTER <--> HF
    ROUTER <--> ANTHROPIC
    API <--> AUTH

    style Frontend fill:#1a237e,stroke:#3f51b5,stroke-width:2px,color:#ffffff
    style Services fill:#2e7d32,stroke:#4caf50,stroke-width:2px,color:#ffffff
    style Data fill:#e65100,stroke:#ff9800,stroke-width:2px,color:#ffffff
    style Integration fill:#4a148c,stroke:#9c27b0,stroke-width:2px,color:#ffffff
    style Security fill:#c62828,stroke:#e53935,stroke-width:2px,color:#ffffff
```

---

## 🖼️ Screenshots

<div align="center">

### Dashboard Overview
![Dashboard](docs/dashboard.png)
*Main dashboard showing all conversations, recent chats, and AI stats*

---

### Chat Interface
![Chat](docs/chat.png)
*Chat interface with message history, model selection, and tool usage*

---

### Memory View
![Memory](docs/memory.png)
*Memory management with conversation history, vector store, and retrieval*

---

### Tool Usage
![Tools](docs/tools.png)
*Tool calling with function signatures, execution logs, and result display*

---

### Model Router
![Router](docs/router.png)
*Model router with multi-model support, fallback routing, and load balancing*

</div>

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **LLM Orchestration** | Complete LLM chat engine with multi-model support, temperature control, and streaming responses |
| 🧠 **Conversational Memory** | Advanced memory management with conversation history, vector store RAG, and context retrieval |
| 🔧 **Tool Calling** | Full tool calling support with function signatures, execution, and result streaming |
| 🛣️ **Model Router** | Intelligent model routing with fallback strategies, load balancing, and automatic failover |
| 🔍 **RAG Indexing** | Vector database integration for retrieval-augmented generation with chunking and embedding |
| 🔔 **Real-time Streaming** | Streaming response support with token-by-token delivery and partial message rendering |
| 🎨 **Beautiful UI** | Sleek, responsive web interface with Bootstrap 5, dark/light mode toggle, and smooth animations |
| 📊 **Analytics Dashboard** | Comprehensive analytics with chat metrics, token usage, and model performance |

---

## ⚡ Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/OneByJorah/llm-chat-app-template.git
cd llm-chat-app-template

# Install dependencies
pip install -r requirements.txt

# Run migrations
flask db upgrade

# Initialize admin user
python manage.py init-admin
```

### Configuration

Edit `config/settings.py`:

```python
# Server
SERVER_NAME = 'llm-chat.local'
SECRET_KEY=*** 'dev-secret-key')

# Database
DATABASE_URL = 'sqlite:///llm.db'

# Redis
REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:***@192.168.1.100:6379')

# LLM Settings
DEFAULT_MODEL = 'anthropic/claude-3-sonnet-20240229'
MAX_TOKENS = 4096
MAX_HISTORY = 10
```

### Running the Application

```bash
# Development
flask run --host=0.0.0.0 --port=5000

# Production
gunicorn --workers=4 --bind=0.0.0.0:5000 --timeout=120 app:create_app()
```

### Accessing the Web UI

```
http://localhost:5000
```

---

## 🔍 API Reference

### Base URL

```
http://localhost:5000/api/v1
```

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/chats` | GET | List all chats |
| `/api/v1/chats/<id>` | GET | Get chat details |
| `/api/v1/chats/<id>` | POST | Send message |
| `/api/v1/chats/<id>` | DELETE | Delete chat |
| `/api/v1/memory` | GET | Get memory state |
| `/api/v1/memory/clear` | POST | Clear memory |
| `/api/v1/tools` | GET | List available tools |
| `/api/v1/tools/<name>` | POST | Execute tool |
| `/api/v1/models` | GET | List models |
| `/api/v1/models/<name>` | PUT | Set default model |
| `/api/v1/health` | GET | System health check |

---

## 📊 Monitoring

### System Health

```bash
# Check service status
sudo systemctl status llm-chat

# Check database connection
sqlite3 /var/lib/llm-chat/llm.db "SELECT 1"

# Check Redis
redis-cli ping
```

### Logs

```bash
# Application logs
sudo tail -f /var/log/llm-chat/app.log
```

---

## 🔒 Security

### Network Security

- Session-based authentication with Flask-Login
- CSRF protection on all forms
- Rate limiting on API endpoints

### Authentication

- Session-based authentication with Flask-Login
- JWT tokens for API access
- Role-based access control (RBAC)

---

## 📚 Dependencies

### Python

```
Flask>=3.0.0
Flask-SQLAlchemy>=3.0.0
Flask-Migrate>=3.1.0
Flask-CORS>=4.0.0
Flask-Login>=0.6.0
PyYAML>=6.0
anthropic>=0.30.0
langchain>=0.1.0
langchain-community>=0.0.10
openai>=1.0.0
tiktoken>=0.5.0
redis>=4.5.0
```

### System Dependencies

```
chromium-browser>=120.0
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 📞 Support

For issues or questions, please open an issue on GitHub:

https://github.com/OneByJorah/llm-chat-app-template/issues

---

## 🙏 Acknowledgments

- **Flask**: Web framework by Armin Ronacher
- **LangChain**: LLM frameworks by LangChain Inc.

---

**Made with ❤️ by [OneByJorah](https://github.com/OneByJorah)**
