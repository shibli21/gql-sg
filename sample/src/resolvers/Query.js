const Query = {
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
};

export { Query as default };
