FROM nginx

RUN apt-get update && apt-get install -y curl

COPY ./app.conf /etc/nginx/conf.d/.

COPY html/. /usr/share/nginx/html/.
