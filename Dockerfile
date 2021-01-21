FROM node:alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/webapp

# Build the client
COPY ./client/package*.json ./client/
RUN cd client && npm ci 
COPY ./client/ ./client/
RUN cd client && npm run build

# Build the server
COPY ./server/package*.json ./server/
RUN cd server && npm ci 
COPY ./server/ ./server/
RUN cd server && npm run build

# Start the server
CMD ["node", "server/dist/main"]