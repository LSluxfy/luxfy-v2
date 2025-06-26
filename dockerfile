# Etapa 1: build da aplicação frontend
FROM node:20 AS builder

WORKDIR /app

# Copia apenas os arquivos do frontend
COPY package*.json ./
RUN npm ci --force

COPY . .

# Gera o build da aplicação React/Vite
RUN npm run build

# Etapa 2: nginx para servir o frontend
FROM nginx:alpine

# Copia os arquivos de build do Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração customizada do nginx (para SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
