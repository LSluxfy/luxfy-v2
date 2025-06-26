FROM node:20

# Instalar dependências de sistema para libs (se precisar para algo específico)
RUN apt-get update && apt-get install -y \
  ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia package e instala deps
COPY package*.json ./
RUN npm ci --force

# Copia todo código
COPY . .

# Build API (TS -> JS)
RUN npm run build:api

# Build frontend (Vite)
RUN npm run build

# Exponha a porta (ajuste para 3000 se quiser)
EXPOSE 3000

# Copie o server.js para rodar Express e servir frontend + API
# Caso ainda não tenha, vou mandar o exemplo mais abaixo
COPY server.js .

# Rodar servidor Express customizado que serve API + frontend
CMD ["node", "dist/api/evolution-api.js"]
