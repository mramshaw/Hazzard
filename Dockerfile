FROM node:lts

RUN mkdir /app

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm install --silent

# Copy the app files
COPY *.js /app/

# Copy the test and linting files
RUN mkdir /app/test
COPY .eslintrc.json /app/
COPY test/* /app/test/

ENV NODE_ENV production

EXPOSE 5000

CMD ["node", "app"]
