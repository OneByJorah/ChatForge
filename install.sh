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

echo "Starting dev server on port 8787..."
npm run dev
