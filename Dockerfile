FROM node:8


WORKDIR /it-quran

COPY . .

RUN npm install


EXPOSE 9696

CMD [ "npm" , "start" ]