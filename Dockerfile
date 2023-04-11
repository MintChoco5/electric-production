FROM nginx:1.19
ADD ./build/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx
EXPOSE 80