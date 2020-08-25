import { GraphQLServer } from "graphql-yoga";
import { v4 } from "uuid";
import db from "./db";

//Resolvers

const resolvers = {
  Query: {
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
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      } else {
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
      }
    },
    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      } else {
        return db.posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
          );
        });
      }
    },
    comments(parent, args, { db }, info) {
      return db.comments;
    },
  },
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some((user) => {
        return user.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error("Email taken!!");
      }

      const user = {
        id: v4(),
        ...args.data,
      };
      db.users.push(user);
      return user;
    },
    createPost(parent, args, { db }, info) {
      const userExists = db.users.some((user) => {
        return user.id === args.data.author;
      });
      if (!userExists) {
        throw new Error("User Not Found!!");
      }
      const post = {
        id: v4(),
        ...args.data,
      };
      db.posts.push(post);
      return post;
    },
    createComment(parent, args, { db }, info) {
      const userExists = db.users.some((user) => {
        return user.id === args.data.author;
      });
      const postExists = db.posts.some(
        (post) => post.id === args.data.post && post.published
      );
      if (!userExists && !postExists) {
        throw new Error("Unable to find user and post!!");
      }

      const comment = {
        id: v4(),
        ...args.data,
      };

      db.comments.push(comment);

      return comment;
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex((user) => {
        return user.id === args.id;
      });
      if (userIndex === -1) {
        throw new Error("user not found!");
      }
      const deletedUser = db.users.splice(userIndex, 1);
      db.posts = db.posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          db.comments = db.comments.filter(
            (comment) => comment.post !== post.id
          );
        }

        return !match;
      });

      db.comments = db.comments.filter((comment) => comment.author !== args.id);

      return deletedUser[0];
    },
    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex((post) => post.id === args.id);

      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      const deletedPosts = db.posts.splice(postIndex, 1);

      db.comments = db.comments.filter((comment) => comment.post !== args.id);

      return deletedPosts[0];
    },
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(
        (comment) => comment.id === args.id
      );

      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }

      const deletedComments = db.comments.splice(commentIndex, 1);

      return deletedComments[0];
    },
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, { db }, info) {
      return db.posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers,
  context: {
    db,
  },
});

server.start(() => {
  console.log("The server is running on http://localhost:4000");
});
