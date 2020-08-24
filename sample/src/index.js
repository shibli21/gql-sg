import { GraphQLServer } from "graphql-yoga";

//type definitions (schema)
const typeDefs = `
    type Query {
      greeting(name: String!): String!
      grades : [Int!]!
      add(numbers : [Float!]!):Float!
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
    add(parent, args, ctx, info) {
      console.log(args);
      if (args.numbers.length === 0) {
        return 0;
      } else {
        return args.numbers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      }
    },
    grades(parent, args, ctx, info) {
      return [99, 100, 70];
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
