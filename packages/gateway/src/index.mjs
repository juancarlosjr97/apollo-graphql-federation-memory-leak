import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: "subgraph",
        /**
         * SUBGRAPH_ENDPOINT defined on the Dockerfile
         */
        url: process.env.SUBGRAPH_ENDPOINT || "http://localhost:4001/graphql",
      },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Apollo Gateway ready at ${url}`);
