FROM node:slim

WORKDIR /app
COPY . /app/
RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
