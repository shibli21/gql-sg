import { GraphQLServer } from "graphql-yoga";

//type definitions (schema)
const typeDefs = `
    type Query {
      id: ID!  
      name : String!
      age : Int!
      employed :Boolean!
      gpa: Float
    }
`;

//Resolvers

const resolvers = {
  Query: {
    id() {
      return "1";
    },
    name() {
      return "Shibli";
    },
    age() {
      return 22;
    },
    employed() {
      return true;
    },
    gpa() {
      return 4.83;
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
