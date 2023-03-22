# Build
FROM node:18.15.0-alpine as builder

WORKDIR /app


COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

# Serve
FROM node:18.15.0-alpine

WORKDIR /app

COPY --from=builder /app/built/ ./src/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/dependency-injection/*.yaml ./src/dependency-injection/

EXPOSE 3977

USER node

CMD ["node", "./src/app.js"]