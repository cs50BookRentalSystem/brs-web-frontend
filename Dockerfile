# Builder
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build  # Vite outputs to /app/dist

# Production
FROM nginx:1.27-alpine

# Copy static assets to nginx html dir
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default config (to support client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]