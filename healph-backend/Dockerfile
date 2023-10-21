FROM node:16.20.0-alpine

WORKDIR /healph-backend/
#extracts to /healph/backend except node_modules
COPY . ./
RUN npm install

EXPOSE 3000
#    from    to
CMD ["npm", "start"]

#change if necessary
