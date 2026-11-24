FROM node:18.9.1

WORKDIR /app

COPY package*.json .

RUN npm install

COPY .env ./

COPY . .


RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]