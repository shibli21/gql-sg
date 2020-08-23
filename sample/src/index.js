import { GraphQLServer } from "graphql-yoga";

//type definitions (schema)
const typeDefs = `
    type Query {
        hello : String!
    }
`;

//Resolvers

const resolvers = {
  Query: {
    hello() {
      return "Hello World ! I'm Shibli";
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(() => {
  console.log("The server is running !");
});
