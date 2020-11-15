const express = require('express')
const Posts = require('./posts-model.js')
const router = express.Router()

router.get('/', (req, res) => {
    Posts.getAllPosts()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

router.post('/', (req, res) => {
    Posts.addPost(req.body)
    .then(newPost => {
        res.status(200).json(newPost)
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})


router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updated = req.body;
  
    Posts.findById(id)
      .then((user) => {
        if (user) {
          Posts.update(id, updated).then((updatedPost) => {
            res.json(updatedPost);
          });
        } else {
          res.status(404).json({ message: "Error - Could not update the post, Please try again." });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Error - Could not update the post. Please try again." });
        console.log(err)
      });
  });

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Posts.removePost(id)
    .then(removedPost => {
        console.log(removedPost)
        res.status(200).json("Deleted Post")
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})


module.exports = router;