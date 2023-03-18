FROM node:16-alpine AS builder
WORKDIR /app

# install and cache app dependencies
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html