const express = require("express");
const Users = require("./users-model.js");
const Posts = require('../posts/posts-model.js')
const router = express.Router();
const authenticate = require("../auth/auth-middleware.js");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get user" });
    });
});
router.post("/register", (req, res) => {
  const userData = req.body;

  Users.add(userData)
    .then((user) => {
      res.status(201).json(user.id);
    })
    .catch((err) => {
      res.status(500).json({ message: "error" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
    .then((user) => {
      if (user) {
        Users.update(id, changes).then((updateduser) => {
          res.json(updateduser);
        });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});
router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  Users.findPost(id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get posts" });
    });
});

router.post("/:id/posts", (req, res) => {
  const id = req.params.id;
  const newPost = req.body;
  Users.addPost(newPost)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/:id/newpost', authenticate, (req, res) => {
  console.log("id here ->", req.params.id)
  const newPost = {user_id: req.params.id, post_name:req.body.post_name, post_location:req.body.post_location, post_description:req.body.post_description}
  Posts.addPost(newPost)
  .then(newPost => {
      res.status(200).json(newPost)
  })
  .catch(err => {
      res.status(500).json({
          message: err.message
      })
  })
})

module.exports = router;
