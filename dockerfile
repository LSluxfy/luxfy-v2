# Dockerfile ajustado para Puppeteer
FROM node:20

# Instala dependências do Chromium para Puppeteer
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia e instala dependências do Node.js
COPY package*.json ./
RUN npm install --force

# Copia o projeto e compila a API
COPY . .
RUN npm run build:api

# Expõe a porta da API
EXPOSE 3001

# Inicia a API com opção --no-sandbox para Puppeteer
CMD ["node", "dist/api/evolution-api.js"]
