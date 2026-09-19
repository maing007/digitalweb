FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate
RUN npx prisma db push
EXPOSE 3000
CMD ["npm", "run", "dev"]
