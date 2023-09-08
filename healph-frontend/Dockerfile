FROM node:18-alpine

WORKDIR /healph-frontend/
#extracts to /healph/frontend except node_modules
#    from        to
COPY package*.json ./
COPY package-lock*.json ./
COPY *.env ./
COPY public/ ./public
COPY src/ ./src

EXPOSE 5000
RUN npm install
#    from    to
CMD ["npm", "start"]
#change if necessary
