###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node package-lock.json ./

RUN yarn install --immutable
COPY --chown=node:node . .

USER node

CMD [ "node", "dist/main.js" ]
