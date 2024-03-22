# Stage 1: Installing dependencies
FROM node:lts AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Building the application - This might not be necessary unless you have a build step, because you are just copying files here
FROM node:lts AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Stage 3: Runner
FROM node:lts AS runner
WORKDIR /app
COPY --from=builder /app ./

# Your app binds to port 4000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8000

CMD ["node", "server.js"]
