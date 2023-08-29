FROM node:16.20.0-alpine

WORKDIR /healph-backend/
#extracts to /healph/backend except node_modules
COPY package*.json ./
COPY package-lock*.json ./
COPY auth/ ./auth
COPY bin/ ./bin
COPY controllers/ ./controllers
COPY models/ ./models
COPY public/ ./public
COPY routes/ ./routes
COPY views/ ./views
COPY app*.js ./

RUN npm install

EXPOSE 3000
#    from    to
CMD ["npm", "start"]

#change if necessary
