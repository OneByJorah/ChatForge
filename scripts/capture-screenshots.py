#!/usr/bin/env python3
"""Capture ChatForge screenshots using Playwright HTML mockups.

Usage:
    python scripts/capture-screenshots.py

Prerequisites:
    pip install playwright
    python -m playwright install chromium

Screenshots are saved to docs/screenshots/ for use in the README.
"""
from playwright.sync_api import sync_playwright
import time
import os

SCREENSHOT_DIR = os.environ.get("SCREENSHOT_DIR", "docs/screenshots")

CHAT_HTML = r"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatForge - AI Chat</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #0a0a0f; color: #e2e8f0; height: 100vh; display: flex; }
        .sidebar { width: 280px; background: #12121a; border-right: 1px solid #1e1e2e; padding: 20px; }
        .logo { font-size: 20px; font-weight: 700; color: #8b5cf6; margin-bottom: 24px; }
        .logo span { color: #f59e0b; }
        .new-chat { background: #8b5cf6; color: white; border: none; padding: 12px; border-radius: 8px; width: 100%; margin-bottom: 20px; }
        .chat-item { padding: 12px; border-radius: 8px; margin-bottom: 4px; font-size: 13px; color: #94a3b8; }
        .chat-item.active { background: #1e1e2e; color: #e2e8f0; }
        .main { flex: 1; display: flex; flex-direction: column; }
        .header { padding: 16px 24px; border-bottom: 1px solid #1e1e2e; display: flex; align-items: center; gap: 12px; }
        .model-badge { background: #1e1e2e; padding: 6px 12px; border-radius: 20px; font-size: 12px; color: #8b5cf6; }
        .messages { flex: 1; padding: 24px; }
        .message { margin-bottom: 24px; display: flex; gap: 12px; }
        .avatar { width: 32px; height: 32px; border-radius: 50%; background: #8b5cf6; display: flex; align-items: center; justify-content: center; }
        .avatar.user { background: #3b82f6; }
        .content { flex: 1; line-height: 1.6; font-size: 14px; }
        .input-area { padding: 20px 24px; border-top: 1px solid #1e1e2e; }
        .input-wrapper { display: flex; gap: 12px; background: #1e1e2e; border-radius: 12px; padding: 12px 16px; }
        .input-wrapper input { flex: 1; background: transparent; border: none; color: #e2e8f0; font-size: 14px; outline: none; }
        .send-btn { background: #8b5cf6; color: white; border: none; width: 40px; height: 40px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="logo">Chat<span>Forge</span></div>
        <button class="new-chat">+ New Chat</button>
        <div class="chat-item active">Building a REST API...</div>
        <div class="chat-item">Python data analysis...</div>
        <div class="chat-item">React component help...</div>
    </div>
    <div class="main">
        <div class="header">
            <span style="font-weight: 600;">Building a REST API</span>
            <span class="model-badge">☁️ Workers AI</span>
        </div>
        <div class="messages">
            <div class="message">
                <div class="avatar user">J</div>
                <div class="content">How do I create a REST API with FastAPI?</div>
            </div>
            <div class="message">
                <div class="avatar">🤖</div>
                <div class="content">I'll help you create a REST API with FastAPI. Here's a complete example...</div>
            </div>
        </div>
        <div class="input-area">
            <div class="input-wrapper">
                <input type="text" placeholder="Type your message...">
                <button class="send-btn">→</button>
            </div>
        </div>
    </div>
</body></html>
"""

MODELS_HTML = r"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ChatForge - Models</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #0a0a0f; color: #e2e8f0; padding: 40px; }
        h1 { font-size: 28px; margin-bottom: 32px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .card { background: #12121a; border: 1px solid #1e1e2e; border-radius: 12px; padding: 24px; }
        .card:hover { border-color: #8b5cf6; }
        .name { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
        .provider { font-size: 12px; color: #8b5cf6; margin-bottom: 12px; }
        .desc { font-size: 13px; color: #94a3b8; line-height: 1.5; }
    </style>
</head>
<body>
    <h1>🤖 AI Models</h1>
    <div class="grid">
        <div class="card"><div class="name">Llama 3.1</div><div class="provider">☁️ Workers AI</div><div class="desc">Meta's latest large language model</div></div>
        <div class="card"><div class="name">Mistral 7B</div><div class="provider">☁️ Workers AI</div><div class="desc">Compact yet powerful model</div></div>
        <div class="card"><div class="name">Claude 3.5 Sonnet</div><div class="provider">☁️ AI Gateway</div><div class="desc">Anthropic's highly capable model</div></div>
        <div class="card"><div class="name">GPT-4o</div><div class="provider">☁️ AI Gateway</div><div class="desc">OpenAI's multimodal model</div></div>
        <div class="card"><div class="name">Phi-3 Mini</div><div class="provider">☁️ Workers AI</div><div class="desc">Efficient small model</div></div>
        <div class="card"><div class="name">Gemma 2</div><div class="provider">☁️ Workers AI</div><div class="desc">Google's open model</div></div>
    </div>
</body></html>
"""

HISTORY_HTML = r"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ChatForge - History</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #0a0a0f; color: #e2e8f0; padding: 40px; }
        h1 { font-size: 28px; margin-bottom: 32px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px 16px; background: #12121a; color: #94a3b8; font-size: 12px; text-transform: uppercase; }
        td { padding: 16px; border-bottom: 1px solid #1e1e2e; font-size: 14px; }
        .model { color: #8b5cf6; font-size: 12px; }
        .tokens { color: #f59e0b; font-family: monospace; }
        .status { padding: 4px 8px; border-radius: 4px; font-size: 11px; }
        .complete { background: #065f46; color: #10b981; }
        .active { background: #1e1e2e; color: #8b5cf6; }
    </style>
</head>
<body>
    <h1>📊 Chat History</h1>
    <table>
        <thead><tr><th>Title</th><th>Model</th><th>Messages</th><th>Tokens</th><th>Status</th></tr></thead>
        <tbody>
            <tr><td>Building a REST API</td><td class="model">Llama 3.1</td><td>12</td><td class="tokens">4,523</td><td><span class="status complete">Complete</span></td></tr>
            <tr><td>Python data analysis</td><td class="model">GPT-4o</td><td>8</td><td class="tokens">2,891</td><td><span class="status complete">Complete</span></td></tr>
            <tr><td>React component help</td><td class="model">Claude 3.5</td><td>24</td><td class="tokens">12,456</td><td><span class="status active">Active</span></td></tr>
        </tbody>
    </table>
</body></html>
"""

os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        
        for name, html in [("chat-ui.png", CHAT_HTML), ("models.png", MODELS_HTML), ("history.png", HISTORY_HTML)]:
            print(f"Capturing {name}...")
            page.set_content(html)
            page.wait_for_load_state("networkidle")
            time.sleep(1)
            path = os.path.join(SCREENSHOT_DIR, name)
            page.screenshot(path=path, full_page=False)
            print(f"Saved: {path} ({os.path.getsize(path):,} bytes)")
        
        browser.close()
    print("\nAll screenshots captured successfully!")

if __name__ == "__main__":
    capture_screenshots()
