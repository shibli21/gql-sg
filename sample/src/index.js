import { GraphQLServer } from "graphql-yoga";

//type definitions (schema)
const typeDefs = `
    type Query {
      greeting(name: String): String!
      me : User!
      post :Post!
    }
    type User {
      id: ID!
      name : String!
      email: String!
      age: Int
    }    
    type Post {
      id: ID!
      title : String!
      body: String!
      published: Boolean!
    }    
`;

//Resolvers

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      console.log(args);
      if (args.name) {
        return `Hello ${args.name}!`;
      } else {
        return `HeLLoOOo`;
      }
    },
    me() {
      return {
        id: "1213",
        name: "Shibli",
        email: "shibli@gmail.com",
        // age: 22,
      };
    },
    post() {
      return {
        id: "1",
        title: "How to do ...",
        body:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptatem est dicta qui non quae saepe quisquam earum in velit?",
        published: false,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(() => {
  console.log("The server is running on http://localhost:4000");
});
