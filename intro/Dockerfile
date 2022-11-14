FROM node:16.15.0 as build-stage

WORKDIR /var/jenkins_home/workspace/frontend/intro

COPY . .

RUN npm install --force

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/frontend/intro/build /usr/share/nginx/html

COPY --from=build-stage /var/jenkins_home/workspace/frontend/intro/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g","daemon off;"]