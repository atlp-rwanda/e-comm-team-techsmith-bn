FROM node:lts-alpine

ENV NODE_ENV=production
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY [".env","package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"], 
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5005
USER node
COPY --chown=node:node . .

CMD printenv && npm start
