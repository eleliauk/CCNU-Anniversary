FROM node:14.18.1
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
# Build server file
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
# Bundle app source
EXPOSE 3000
CMD [ "yarn", "preview" ]