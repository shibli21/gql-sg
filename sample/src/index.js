import { GraphQLServer } from "graphql-yoga";

const users = [
  {
    id: "1",
    name: "rabbi",
    email: "rabbi@gmail.com",
    age: 22,
  },
  {
    id: "2",
    name: "himel",
    email: "himel@gmail.com",
    age: 22,
  },
];

const posts = [
  {
    id: "1",
    title: "GraphQl 101",
    body: "This iss GraphQl 101",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Prisma 101",
    body: "Advance course",
    published: true,
    author: "1",
  },
  {
    id: "3",
    title: "Apollo 101",
    body: "Learn Prisma",
    published: true,
    author: "2",
  },
];

//type definitions (schema)
const typeDefs = `
    type Query {
      users(query : String) :[User!]!
      posts(query : String) : [Post!]!
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
      author : User!
    }    
`;

//Resolvers

const resolvers = {
  Query: {
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      } else {
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
      }
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      } else {
        return posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
          );
        });
      }
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
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
