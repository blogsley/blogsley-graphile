const express = require("express");
var cors = require('cors')

const { postgraphile } = require("postgraphile");

import "reflect-metadata";
import { createConnection } from "typeorm";
//import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import  { GraphQLSchema } from 'graphql';

import { TypeOrmConnection } from '@auto-relay/typeorm'
import { AutoRelayConfig } from 'auto-relay'
new AutoRelayConfig({ orm: () => TypeOrmConnection })

import container from './inversify.config';

import { AuthResolver } from "./auth/auth.resolver";
import { UserResolver } from "./user/user.resolver";
import { PostResolver } from "./post/post.resolver";

import dbConfig from "./db/config";

import { UploadPlugin } from './plugins/upload';


async function generateSchema(): Promise<GraphQLSchema> {
  try {
    const schema = await buildSchema({
      container,
      resolvers: [
        AuthResolver,
        UserResolver,
        PostResolver
      ]
    })
    return schema
  } catch (e) {
    console.error(e)
    throw e
  }
}


async function main() {
  const connection = await createConnection(dbConfig);
  const schema = await generateSchema();
  //console.log(schema);

  const app = express();

  app.use(cors()); //cors enabled on all routes, all hosts

  app.use(
    postgraphile(
      process.env.POSTGRES_HOST || "postgres://blogsley:blogsley@localhost:5432/blogsley",
      "public",
      {
        graphqlRoute: '/graphql/',
        //enableCors: true,
        showErrorStack: true,
        extendedErrors: ['hint', 'detail', 'errcode'],
        subscriptions: true,
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        appendPlugins: [ UploadPlugin, ]
      }
    )
  );

  app.listen(process.env.PORT || 8000);
  console.log("Server has started!");
}

/*
async function main() {
  const connection = await createConnection(dbConfig);
  const schema = await generateSchema();
  console.log(schema);
  const server = new ApolloServer({
    schema,
    playground: {
      settings: {
        // 'editor.theme': 'light',
      }
    },
  });
  await server.listen(5000);
  console.log("Server has started!");
}
*/

main();