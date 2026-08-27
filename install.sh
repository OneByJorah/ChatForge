#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "=== Installing ChatForge local dev environment ==="

if ! command -v node &> /dev/null; then
    echo "Node.js is required. Install from https://nodejs.org/"
    exit 1
fi

if [ ! -d node_modules ]; then
    npm install
fi

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "Created .env from .env.example. Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID before deploying."
    fi
fi

echo "Starting dev server on http://localhost:8787 ..."
npm run dev
