FROM node:16.14-alpine
WORKDIR /app-frontend
COPY package*.json ./
#COPY node_modules.zip ./
#RUN unzip node_modules
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
