# ChatForge

> Cloudflare Workers AI chat application with edge inference and streaming.

![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-%23FFB300?style=for-the-badge)
![Language](https://img.shields.io/badge/language-Python-informational?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-linux-informational?style=for-the-badge)

ChatForge is an enterprise-grade, ops-precise platform built for VIDE and SMB operations. Run it solo. Deliver results.

- **Edge-native runtime**: Cloudflare Workers with zero cold-start servers.
- **LLM chat**: Workers AI model inference.
- **Streaming responses**: live token delivery to the UI.
- **Typed worker config**: `wrangler.jsonc` + generated types.
- **Local preview**: Wrangler dev mode for local iteration.

---

## Architecture

Client browser → static frontend (`public/index.html` + `public/chat.js`) → Cloudflare Worker (`src/index.ts`) → Workers AI → streaming response.

The frontend posts messages to the Worker, which calls Workers AI and streams tokens back. No origin server required.

---

| Layer | Stack |
|---|---|
| Runtime | Cloudflare Workers |
| Backend | TypeScript / Workers AI |
| Frontend | HTML5 + JavaScript |
| Tooling | Wrangler, Vitest, Workers TypeGen |
| VCS | Git + GitHub (`github.com/OneByJorah/ChatForge`) |

---

## Quickstart

```bash
git clone https://github.com/OneByJorah/ChatForge.git
cd ChatForge
# Follow in-repo setup instructions
```
Verify by checking service health or running the in-repo test command.

## Roadmap

- Feature parity with production requirements
- Observability and alerting expansions
- Community feedback integration

## License

MIT — Copyright JorahOne, LLC. See [LICENSE](LICENSE) for details.

---

[OneByJorah](https://github.com/OneByJorah) · [JorahOne-Services](https://github.com/JorahOne-Services)
