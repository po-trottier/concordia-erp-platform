# Build using the full node image
FROM node:latest AS builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG ENV_TOKEN
ENV ENV_TOKEN=${ENV_TOKEN}

WORKDIR /srv/webapp

# Copy the ENV scripts
COPY ./package*.json ./
COPY ./scripts/ ./scripts/

# Build the client
COPY ./client/package*.json ./client/
RUN cd client && npm ci
COPY ./client/ ./client/

# Copy the server
RUN npm install -g @nestjs/cli
COPY ./server/package*.json ./server/
RUN cd server && npm ci
COPY ./server/ ./server/

# Build the projects
RUN npm run unlock ${ENV_TOKEN} && cd client && npm run build
RUN cd server && npm run build
RUN cd client && npm run build

# Run the built image on the lightweight node alpine
FROM node:alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/webapp

# Copy the production build from the builder step
COPY --from=builder /srv/webapp/client/build/ ./client/build/
COPY --from=builder /srv/webapp/server/dist/ ./server/dist/
COPY --from=builder /srv/webapp/server/node_modules/ ./server/node_modules/

# Start the server
CMD ["node", "server/dist/main"]