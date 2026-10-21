#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/web"
PORT="${PORT:-5173}"
echo "Plata → http://127.0.0.1:${PORT}"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
