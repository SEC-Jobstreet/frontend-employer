FROM node:20-alpine AS development
ENV NODE_ENV=development
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

FROM node:20-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]