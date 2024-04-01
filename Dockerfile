# Stage 1: Install dependencies
FROM node:lts AS node_modules

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

# Stage 2: Build application
FROM node:lts AS dist

WORKDIR /usr/src/app

COPY . .

RUN npm run build

# Stage 3: Create the final image
FROM node:lts

ARG PORT=3000
ENV PORT $PORT

WORKDIR /usr/src/app

COPY --from=dist /usr/src/app/dist ./dist
COPY --from=node_modules /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE $PORT

# Run migrations

CMD ["npm", "run", "start:dev"]
