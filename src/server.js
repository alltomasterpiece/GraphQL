const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const {FileUploadDataSource} = require('./FileUploadDataSource');
require('dotenv').config();
const cors = require('cors');
// const emitter = new EventEmitter();
process.setMaxListeners(0);
const express = require("express");
const app = express();

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // console.log('[Auth DataSource]<', context, '>');
    request.http.headers.set('authorization', context.token);
  }
}

const serviceList = [
  { name: 'Book', url: `http://localhost:${process.env.PORT_BOOK}` },
  { name: 'Category', url: `http://localhost:${process.env.PORT_CATEGORY}` },
  { name: 'Exam', url: `http://localhost:${process.env.PORT_EXAM}` },
  { name: 'User', url: `http://localhost:${process.env.PORT_USER}` },
  { name: 'Point', url: `http://localhost:${process.env.PORT_POINT}` }
];
// now done for gateway.

const gateway = new ApolloGateway({
  serviceList,
  buildService({ name, url }) {
    return new FileUploadDataSource({ url });
  },
});

(async () => {
  const server = new ApolloServer({
    cors: {
      origin: "*"
    },
    gateway,
    subscriptions: false,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    },
  });

  server.applyMiddleware({ app });
  const port = process.env.PORT_GATEWAY;
  app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
})();
