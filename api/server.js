const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authenticate = require("../auth/auth-middleware.js");
const authRouter = require("../auth/auth-router.js");
const postsRouter = require("../posts/posts-router.js");
const usersRouter = require("../users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);

server.use("/api/users", usersRouter);
server.use("/api/posts", authenticate, postsRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
