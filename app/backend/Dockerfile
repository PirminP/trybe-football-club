FROM node:16.14-alpine
WORKDIR /app-backend
COPY package*.json ./
#COPY . .
#RUN unzip node_modules
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]