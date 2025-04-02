# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project and build the application
COPY . .

# Use the environment variable to skip ESLint during build
ARG SKIP_ESLINT
RUN if [ "$SKIP_ESLINT" = "true" ]; then \
      echo "Skipping ESLint checks"; \
      NEXT_PRIVATE_IGNORE_ESLINT=true npm run build; \
    else \
      npm run build; \
    fi
CMD ["npm", "start"]

# Stage 2: Run the application
FROM node:18-alpine
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

# Expose the port and set the command to run the Next.js app
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
