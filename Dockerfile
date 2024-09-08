FROM node:latest AS build
WORKDIR /home/url-shortner
COPY . .
RUN npm i
RUN npm rum build

FROM node:latest
WORKDIR /home/backend
COPY --from=build /home/url-shortner/dist/url-shortner .
COPY --from=build /home/url-shortner/*.json .
COPY --from=build /home/url-shortner/.env .
RUN ls -al
RUN npm i --omit=dev
CMD ["npm", "run", "start:deployed"]
EXPOSE 3000

