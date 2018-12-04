FROM node:8


WORKDIR /it-quran

COPY . .

RUN npm install


CMD [ "npm" , "start" ]