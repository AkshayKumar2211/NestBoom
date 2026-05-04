FROM dhi.io/node:24-alpine3.22-dev AS development

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install --only=development

COPY . .

RUN npm run build

FROM dhi.io/node:24-alpine3.22-dev AS production

