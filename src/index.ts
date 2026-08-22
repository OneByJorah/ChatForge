/**
 * LLM Chat Application Template
 *
 * A simple chat application using Cloudflare Workers AI.
 * This template demonstrates how to implement an LLM-powered chat interface with
 * streaming responses using Server-Sent Events (SSE).
 *
 * @license MIT
 */
import { Env, ChatMessage } from "./types";

// Model ID for Workers AI model
// https://developers.cloudflare.com/workers-ai/models/
const MODEL_ID = "@cf/meta/llama-3.1-8b-instruct-fp8";

// Default system prompt
const SYSTEM_PROMPT =
	"You are a helpful, friendly assistant. Provide concise and accurate responses.";

// Input limits
const MAX_MESSAGES = 100;
const MAX_MESSAGE_LENGTH = 32_000;

/**
 * Adds security headers to a Response
 */
function withSecurityHeaders(response: Response): Response {
	const headers = new Headers(response.headers);
	headers.set("x-content-type-options", "nosniff");
	headers.set("x-frame-options", "DENY");
	headers.set(
		"content-security-policy",
		"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
	);
	headers.set(
		"strict-transport-security",
		"max-age=31536000; includeSubDomains",
	);
	headers.set("referrer-policy", "strict-origin-when-cross-origin");
	headers.set(
		"permissions-policy",
		"camera=(), microphone=(), geolocation=()",
	);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

export default {
	/**
	 * Main request handler for the Worker
	 */
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const url = new URL(request.url);

		// Handle static assets (frontend)
		if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
			return withSecurityHeaders(await env.ASSETS.fetch(request));
		}

		// API Routes
		if (url.pathname === "/api/chat") {
			// Handle POST requests for chat
			if (request.method === "POST") {
				return withSecurityHeaders(await handleChatRequest(request, env));
			}

			// Method not allowed for other request types
			return withSecurityHeaders(
				new Response("Method not allowed", { status: 405 }),
			);
		}

		// Handle 404 for unmatched routes
		return withSecurityHeaders(new Response("Not found", { status: 404 }));
	},
} satisfies ExportedHandler<Env>;

/**
 * Validates and normalizes the messages array from the request body.
 * Returns null if the payload is malformed.
 */
function validateMessages(input: unknown): ChatMessage[] | null {
	if (input === undefined) return [];
	if (!Array.isArray(input) || input.length > MAX_MESSAGES) return null;

	const messages: ChatMessage[] = [];
	for (const msg of input) {
		if (typeof msg !== "object" || msg === null) return null;
		const { role, content } = msg as Record<string, unknown>;
		if (
			(role !== "system" && role !== "user" && role !== "assistant") ||
			typeof content !== "string" ||
			content.length > MAX_MESSAGE_LENGTH
		) {
			return null;
		}
		messages.push({ role, content });
	}
	return messages;
}

/**
 * Handles chat API requests
 */
async function handleChatRequest(
	request: Request,
	env: Env,
): Promise<Response> {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return jsonError("Invalid JSON body", 400);
	}

	const messages = validateMessages(
		(body as { messages?: unknown } | null)?.messages,
	);
	if (messages === null) {
		return jsonError(
			"Invalid messages: expected an array of at most 100 { role, content } objects with role system|user|assistant",
			400,
		);
	}

	// Add system prompt if not present
	if (!messages.some((msg) => msg.role === "system")) {
		messages.unshift({ role: "system", content: SYSTEM_PROMPT });
	}

	try {
		const stream = await env.AI.run(
			MODEL_ID,
			{
				messages,
				max_tokens: 1024,
				stream: true,
			},
			{
				// Uncomment to use AI Gateway
				// gateway: {
				//   id: "YOUR_GATEWAY_ID", // Replace with your AI Gateway ID
				//   skipCache: false,      // Set to true to bypass cache
				//   cacheTtl: 3600,        // Cache time-to-live in seconds
				// },
			},
		);

		return new Response(stream, {
			headers: {
				"content-type": "text/event-stream; charset=utf-8",
				"cache-control": "no-cache",
				connection: "keep-alive",
				"x-content-type-options": "nosniff",
			},
		});
	} catch (error) {
		console.error("Error processing chat request:", error);
		return jsonError("Failed to process request", 500);
	}
}

/**
 * Returns a JSON error response with security headers
 */
function jsonError(message: string, status: number): Response {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: {
			"content-type": "application/json",
			"x-content-type-options": "nosniff",
		},
	});
}
