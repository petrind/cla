FROM node:14.16.0 AS builder
COPY . .
RUN yarn install
RUN yarn build

FROM node:14.16.0-alpine
WORKDIR /contact-list-api
COPY --from=builder node_modules ./node_modules
COPY --from=builder dist ./dist
COPY --from=builder bin ./bin
COPY package.json yarn.lock tsconfig.build.json ./
CMD ["/bin/sh", "-c", "node -v"]
