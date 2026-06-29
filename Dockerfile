# GeoEstate2 — Static Frontend served by nginx
# Railway builds this via Docker, serves on PORT env var

FROM nginx:alpine

# Copy all static files into nginx's default serve directory
COPY . /usr/share/nginx/html/

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Railway sets $PORT — use it
ENV PORT=8080
EXPOSE 8080

# Replace $PORT in nginx config at runtime then start nginx
CMD ["/bin/sh", "-c", "sed -i 's/__PORT__/'\"$PORT\"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
