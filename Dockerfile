FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Final image
FROM nginx:alpine
COPY --from=node /app/dist/angular-test /usr/share/nginx/html