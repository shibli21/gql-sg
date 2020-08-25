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

const db = {
  users,
  posts,
  comments,
};

export { db as default };
