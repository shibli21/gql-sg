import { GraphQLServer } from "graphql-yoga";
import { v4 } from "uuid";

let users = [
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

let posts = [
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

let comments = [
  {
    id: "101",
    text: "Good course",
    author: "1",
    post: "1",
  },
  {
    id: "102",
    text: "Glad you enjoyed",
    author: "2",
    post: "2",
  },
  {
    id: "103",
    text: "I got it to work",
    author: "2",
    post: "1",
  },
  {
    id: "104",
    text: "That's good",
    author: "1",
    post: "2",
  },
];

//type definitions (schema)
const typeDefs = `
    type Query {
      users(query : String) :[User!]!
      posts(query : String) : [Post!]!
      comments : [Comment!]!
      me : User!
      post :Post!

    }
    type Mutation{
      createUser(data: CreateUserInput!) :  User!
      createPost(data:CreatePostInput! ) :Post!
      createComment(data:CreateCommentInput!):Comment!
      deleteUser(id:ID!): User!
    }

    input CreateUserInput {
      name : String!
      email: String!
      age: Int
    }
    input CreatePostInput {
      title: String
      body: String
      published: Boolean!
      author : ID! 
    }
    input CreateCommentInput {
      text :String!
      author: ID!
      post:ID! 
    }

    type User {
      id: ID!
      name : String!
      email: String!
      age: Int
      posts : [Post!]!
      comments : [Comment!]!
    }    
    type Post {
      id: ID!
      title : String!
      body: String!
      published: Boolean!
      author : User!
      comments :[Comment!]!
    }    
    type Comment {
      id: ID!
      text: String!
      author : User!
      post : Post!
    }
`;

//Resolvers

const resolvers = {
  Query: {
    comments(parent, args, ctx, info) {
      return comments;
    },
    me() {
      return {
        id: "1213",
        name: "Shibli",
        email: "shibli@gmail.com",
        age: 22,
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => {
        return user.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error("Email taken!!");
      }

      const user = {
        id: v4(),
        ...args.data,
      };
      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.data.author;
      });
      if (!userExists) {
        throw new Error("User Not Found!!");
      }
      const post = {
        id: v4(),
        ...args.data,
      };
      posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.data.author;
      });
      const postExists = posts.some(
        (post) => post.id === args.data.post && post.published
      );
      if (!userExists && !postExists) {
        throw new Error("Unable to find user and post!!");
      }

      const comment = {
        id: v4(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => {
        return user.id === args.id;
      });
      if (userIndex === -1) {
        throw new Error("user not found!");
      }
      const deletedUser = users.splice(userIndex, 1);
      posts = posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }

        return !match;
      });

      comments = comments.filter((comment) => comment.author !== args.id);

      return deletedUser[0];
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
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
