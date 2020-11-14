const express = require("express");
const Users = require("./users-model.js");
const router = express.Router();

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
router.post("/", (req, res) => {
  const userData = req.body;

  Users.create(userData)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new user" });
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
module.exports = router;
