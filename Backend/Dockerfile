FROM node:latest as dev
WORKDIR /app
CMD ["npm", "start"]

FROM node:latest as production
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]