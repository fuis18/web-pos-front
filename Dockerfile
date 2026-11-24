FROM docker.io/library/node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.yaml* package-lock.json* ./
RUN corepack enable && (pnpm install --frozen-lockfile || pnpm install)

COPY . .
RUN pnpm build

FROM docker.io/library/nginx:alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
