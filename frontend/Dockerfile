# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Accept build-time environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm ci --production=false

COPY . .
RUN npm run build

# Production stage with serve
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

ENV PORT=8080

CMD ["serve", "-s", "build", "-l", "8080"]
