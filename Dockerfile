# syntax=docker/dockerfile:1
FROM nginx:stable-alpine

LABEL org.opencontainers.image.title="ChatForge" \
      org.opencontainers.image.description="Static UI preview for ChatForge AI chat interface" \
      org.opencontainers.image.vendor="OneByJorah" \
      org.opencontainers.image.version="1.0.0"

WORKDIR /usr/share/nginx/html

# Copy only the static frontend assets.
COPY public/ .

# Provide a minimal nginx config that serves the static site on port 8787.
RUN printf 'server { listen 8787; server_name localhost; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } location /health { access_log off; return 200 "ok\n"; add_header Content-Type text/plain; } }\n' > /etc/nginx/conf.d/default.conf

EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8787/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
