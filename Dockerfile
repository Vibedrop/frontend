# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app

# Kopiera paketfiler och installera beroenden
COPY package.json package-lock.json ./
RUN npm install

# Kopiera hela projektet och bygg applikationen
COPY . .

RUN npm run build

CMD ["npm", "start"]

# Stage 2: Run the application
FROM node:18-alpine
WORKDIR /app

# Kopiera den byggda applikationen från build-steget
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
