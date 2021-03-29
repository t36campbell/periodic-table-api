# build backend
FROM node:latest as build-stage
WORKDIR /server
COPY package*.json ./
RUN npm install\
 && npm install tsc -g
COPY . .
RUN npm run tsc
CMD ["npm", "start"]
