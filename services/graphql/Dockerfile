FROM node:latest
RUN npm install -g postgraphile express
RUN mkdir /graphile && chown -R node /graphile/
USER node
WORKDIR /graphile/


ENTRYPOINT ["bash", "./entrypoint.sh"]
