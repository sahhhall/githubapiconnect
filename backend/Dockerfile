FROM node:alpine


RUN npm install -g npm


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install 


COPY . .


EXPOSE 3001


CMD ["npm", "start"]