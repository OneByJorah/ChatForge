/**
 * ChatForge — Unit Tests
 *
 * Covers request routing, streaming, error handling, and system prompt injection.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import worker from "../index";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mockStreamResponse(text = "Hello from AI"): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockAiRun = vi.fn();
const mockAssetsFetch = vi.fn().mockResolvedValue(new Response("OK"));

const mockEnv = {
  AI: { run: mockAiRun },
  ASSETS: { fetch: mockAssetsFetch },
};

const mockCtx = {
  waitUntil: vi.fn(),
  passThroughOnException: vi.fn(),
  name: "test",
} as unknown as ExecutionContext;

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ChatForge Worker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should serve static assets at root path", async () => {
    const request = new Request("http://localhost/");
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(200);
    expect(mockAssetsFetch).toHaveBeenCalledWith(request);
  });

  it("should serve static assets for non-API paths", async () => {
    const request = new Request("http://localhost/other-page.html");
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(200);
  });

  it("should return 405 for GET on /api/chat", async () => {
    const request = new Request("http://localhost/api/chat");
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(405);
    const text = await response.text();
    expect(text).toBe("Method not allowed");
  });

  it("should handle chat POST request with streaming", async () => {
    mockAiRun.mockResolvedValue(mockStreamResponse());

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hello!" }] }),
    });
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/event-stream; charset=utf-8",
    );
    expect(mockAiRun).toHaveBeenCalled();
  });

  it("should return 404 for unknown API routes", async () => {
    const request = new Request("http://localhost/api/unknown");
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(404);
    const text = await response.text();
    expect(text).toBe("Not found");
  });

  it("should return 500 on AI.run failure", async () => {
    mockAiRun.mockRejectedValue(new Error("AI service unavailable"));

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hello!" }] }),
    });
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  it("should return 400 on malformed JSON body", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not json",
    });
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(mockAiRun).not.toHaveBeenCalled();
  });

  it("should return 400 on invalid message shape", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "hacker", content: "Hello!" }],
      }),
    });
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(400);
    expect(mockAiRun).not.toHaveBeenCalled();
  });

  it("should return 400 when message content exceeds limit", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "x".repeat(32_001) }],
      }),
    });
    const response = await worker.fetch(request, mockEnv as any, mockCtx);
    expect(response.status).toBe(400);
    expect(mockAiRun).not.toHaveBeenCalled();
  });

  it("should add system prompt if missing", async () => {
    mockAiRun.mockResolvedValue(mockStreamResponse());

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hello!" }] }),
    });
    await worker.fetch(request, mockEnv as any, mockCtx);

    const callArgs = mockAiRun.mock.calls[0];
    const messages = (callArgs[1] as any).messages;
    expect(messages[0].role).toBe("system");
    expect(messages[0].content).toBeTruthy();
  });

  it("should NOT add system prompt if already present", async () => {
    mockAiRun.mockResolvedValue(mockStreamResponse("Response"));

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a pirate." },
          { role: "user", content: "Ahoy!" },
        ],
      }),
    });
    await worker.fetch(request, mockEnv as any, mockCtx);

    const callArgs = mockAiRun.mock.calls[0];
    const messages = (callArgs[1] as any).messages;
    // Should have exactly 2 messages (system + user), not 3
    expect(messages).toHaveLength(2);
    expect(messages[0].role).toBe("system");
    expect(messages[0].content).toBe("You are a pirate.");
  });
});
