FROM node:12-alpine

# Set working directory
WORKDIR /usr/src/app

# Install CA certificates
RUN apk add ca-certificates bash git

# Copy code
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm","start"]