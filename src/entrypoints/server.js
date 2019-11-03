import { ApolloServer } from "apollo-server-express";
import { connect as createMongoConnection } from "../mongodb"
import createExpress from "express";
import createMorgan from "morgan";
import createWebpackMiddleware from "webpack-dev-middleware";
import * as graphql  from "../graphql";
import { MongoClient } from "mongodb";
import path from "path";
import webpack from "webpack";
import webpackConfig from "../../webpack.config.js";

const CONFIG = {
  mongodb: {
    serverUri: "mongodb://localhost:27017",
    dbName: "hotelsystem",
  },
  graphqlPath: "/graphql",
  httpPort: 3000,
  staticDir: path.join(__dirname, "..", "..", "static"),
};

(async () => {
  const dbClient = await MongoClient.connect(CONFIG.mongodb.serverUri, {
    useUnifiedTopology: true,
  });
  const dbconn = dbClient.db(CONFIG.mongodb.dbName);
  console.log(`MONGODB: connected to ${ CONFIG.mongodb.dbName } @ ${ CONFIG.mongodb.serverUri }`);

  const express = createExpress();

  express.use(createMorgan("dev"));
  console.log("EXPRESS: added request logger");

  express.use(createWebpackMiddleware(webpack(webpackConfig)));
  console.log("WEBPACK: added dev middleware");

  const apollo = new ApolloServer({
    typeDefs: graphql.schema,
    resolvers: graphql.resolvers,

    // If this were beyond trivial we'd wanna use data-sources with at least
    // request-level caching
    context: {
      dbconn,
    },
  });
  apollo.applyMiddleware({ app: express, path: CONFIG.graphqlPath });
  console.log(`GRAPHQL: connected to ${ CONFIG.graphqlPath }`);

  express.use(createExpress.static(CONFIG.staticDir));
  console.log(`EXPRESS: serving static files from ${ CONFIG.staticDir }`);

  express.listen({ port: CONFIG.httpPort }, () => {
    console.log(`EXPRESS: connected to port ${ CONFIG.httpPort }`);
  });
})();
