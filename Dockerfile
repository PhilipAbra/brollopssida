FROM node:8-alpine

EXPOSE 80
WORKDIR /srv/react

COPY package.json .
COPY dist dist
COPY main.js .
RUN chown -R node:node .

USER node
RUN npm install \
    express@$(node -p -e "require('./package.json').dependencies.express") \
    @google-cloud/datastore@$(node -p -e "require('./package.json').dependencies['@google-cloud/datastore']")

USER root

CMD [ "npm", "run", "start:live" ]
