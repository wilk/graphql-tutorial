FROM node:8.4.0

RUN npm install -g yarn@0.27.5 create-react-app

RUN mkdir -p /opt/app
WORKDIR /opt/app

EXPOSE 3000

# custom entrypoint
COPY ./docker/client/entrypoint.sh /
RUN chmod 777 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
