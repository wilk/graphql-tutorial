FROM node:8.4.0

RUN npm install -g yarn@0.27.5

RUN mkdir -p /opt/app
WORKDIR /opt/app

EXPOSE 4000

# custom entrypoint
COPY ./docker/server/entrypoint.sh /
RUN chmod 777 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
