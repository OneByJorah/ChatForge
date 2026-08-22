# ChatForge API Reference

## Base URL

When deployed: `https://chatforge.<your-subdomain>.workers.dev`

Locally: `http://localhost:8787`

## Endpoints

### `POST /api/chat`

Send a chat message and receive a streaming AI response.

**Request Body:**

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ]
}
```

- `messages`: Array of chat messages (max 100; each message max 32,000 chars)
- Each message has `role` (`"system"`, `"user"`, or `"assistant"`) and `content` (string)
- If no system message is provided, a default one is injected automatically

**Response:**

- `Content-Type: text/event-stream; charset=utf-8`
- SSE (Server-Sent Events) stream with `data:` lines
- Supports both Workers AI format (`{"response": "..."}`) and OpenAI-compatible format (`{"choices": [{"delta": {"content": "..."}}]}`)
- Stream ends with `data: [DONE]`

**Error Responses:**

- `400 Bad Request` — Malformed JSON body or invalid `messages` shape/size
- `405 Method Not Allowed` — GET requests to `/api/chat`
- `404 Not Found` — Unknown API routes
- `500 Internal Server Error` — AI service failures

### `GET /` or any non-API path

Serves static frontend assets from the `public/` directory.

## Security Headers

All responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
