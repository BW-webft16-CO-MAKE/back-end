const express = require("express");
const Posts = require("./posts-model.js");
const router = express.Router();

router.get("/posts", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get posts" });
    });
});

router.post(":id/posts/", (req, res) => {
  const postData = req.body;

  Posts.create(postData)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new post" });
    });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Posts.findById(id)
    .then((post) => {
      if (post) {
        posts.update(changes, id).then((updatedpost) => {
          res.json(updatedpost);
        });
      } else {
        res.status(404).json({ message: "Could not find post with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update post" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  posts
    .remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find post with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete post" });
    });
});
module.exports = router;
