FROM node:lts-alpine

ENV NODE_ENV=development
# Create app directory
WORKDIR /src/app
# Install app dependencies
COPY [".env","package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"],
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 5005
RUN chown -R node /src/app
USER node
CMD ["npm", "run", "dev"]
