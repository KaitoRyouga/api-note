# FROM node:12.2.0-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./

# RUN npm install
# COPY . .

# EXPOSE 8080
# CMD [ "npm", "start" ]

## build core
# FROM node:12.2.0-alpine
# WORKDIR /app/api
# COPY . .

## dev enviroment
# FROM docker.pkg.github.com/kaitoryouga/todo/core_api:latest
FROM node:12.2.0-alpine
WORKDIR /usr/src/app/api
COPY *.json ./
RUN yarn install
COPY ./ ./
# RUN rm -Rf ./code && mkdir code
# COPY ./code ./code

# RUN chmod +x ./node_modules/.bin/nodemon
EXPOSE 9090
CMD [ "yarn", "dev" ]