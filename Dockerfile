FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY . .

ENV NGINX_ROOT_FILE=public/index.html

EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8787/ || exit 1
