#stage 1
FROM node:18-alpine as node
WORKDIR /src/app
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:1.18-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /src/app/dist/movies-app/browser /usr/share/nginx/html
