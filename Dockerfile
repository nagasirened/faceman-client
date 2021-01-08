FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:pro


FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

# modify nginx.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY  nginx.conf /etc/nginx/nginx.conf 

# modify default.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY  default.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
