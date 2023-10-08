import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = gql`
  type Query {
    getData: getDataType
  }

  type getDataType {
    byType(
      id: String!
      countryCode: countryCode!
      language: language = "EN_GB"
    ): Data
  }

  type Data {
    name: String
    type: String
  }

  enum countryCode {
    GB
  }

  enum language {
    EN_GB
  }
`;

const resolvers = {
  Query: {
    getData() {
      return {};
    },
  },
  getDataType: {
    byType: (_, { id, countryCode, language }) => ({
      name: id,
      type: `${countryCode}-${language}`,
    }),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀 Apollo Subgraph ready at ${url}`);
