FROM node:18-alpine

WORKDIR /healph-frontend/
#extracts to /healph/frontend except node_modules
#    from        to
COPY . ./
EXPOSE 5000
RUN npm install
#    from    to
CMD ["npm", "run", "build"]
#change if necessary
