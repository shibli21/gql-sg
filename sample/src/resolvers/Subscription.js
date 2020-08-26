const Subscription = {
  comment: {
    subscribe(parent, { postId }, { pubsub, db }, info) {
      const post = db.posts.find((post) => {
        return post.id === postId && post.published;
      });
      if (!post) {
        throw new Error("Post not Found");
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { pubsub, db }, info) {
      return pubsub.asyncIterator(`post`);
    },
  },
};

export default Subscription;
