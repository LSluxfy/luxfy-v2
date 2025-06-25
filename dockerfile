FROM node:20

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos do projeto
COPY . .

# Instala dependências
RUN npm install

# Faz build do front
RUN npm run build

# Faz build do API
RUN npm run build:api

# Expõe a porta da API
EXPOSE 3001

# Inicia o backend
CMD ["node", "dist/api/evolution-api.js"]
