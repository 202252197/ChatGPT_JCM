FROM node:16-alpine AS builder
WORKDIR /app

# install and cache app dependencies
COPY package.json .
RUN npm install

ARG OPENAI_API_KEY=""
ARG OPENAI_API_URL=""
ENV VUE_APP_OPENAI_API_KEY="${OPENAI_API_KEY}"
ENV VUE_APP_OPENAI_API_URL="${OPENAI_API_URL}"

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html