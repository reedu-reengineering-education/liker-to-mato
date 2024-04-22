# Based on best pratices provided by Snyk.io
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

# --------------> The build image
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile
COPY . /usr/src/app
RUN yarn build

# --------------> The production image
FROM node:16.13.0-alpine3.11
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/.next /usr/src/app/.next
COPY --chown=node:node --from=build /usr/src/app/public /usr/src/app/public
COPY --chown=node:node next.config.js /usr/src/app/
CMD ["dumb-init", "node", "node_modules/next/dist/bin/next", "start"]
