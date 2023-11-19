FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production
COPY --from=build-stage /app/busild /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

#dev environment
From node:16-alpine as dev
WORKDIR /app
CMD ["npm", "start"]