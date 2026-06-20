# ChatForge — Cloudflare Workers AI Chat

Simple LLM chat app on Cloudflare Workers + Workers AI.

## Run it
```bash
npm install
npm run start
```

Open the Workers preview URL from `wrangler dev`, then chat at `/`.

## Verified references
- APIs: `POST /api/chat` with JSON body `{ messages }` SSE stream response
- Worker entry: `src/index.ts`
- Frontend: `public/index.html` + `public/chat.js`
- Types: `src/types.ts`
- Config: `wrangler.jsonc` (`assets.directory: "./public"`)
- Model: `@cf/meta/llama-3.1-8b-instruct-fp8`

## Screenshots
- `docs/screenshots/chatforge-ui.png`

## Status
✅ Source verified; app identity is one Cloudflare Workers chat worker.
