
const express = require('express')
const Posts = require('./posts-model.js')
const router = express.Router()

router.get('/', (req, res) => {
    Posts.getAllPostsByUser()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

// router.post('/newpost', (req, res) => {
//     console.log("id here ->", req.params.id)
//     const newPost = {post_name:req.body.post_name, post_location:req.body.post_location, post_description:req.body.post_description}
//     Posts.add(newPost)
//     .then(newPost => {
//         res.status(200).json(newPost)
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: err.message
//         })
//     })
//   })

  router.post("/newpost", (req, res) => {
    console.log("HELLO", req.decodedJWT)
    const newPost = {user_id:req.decodedJWT.id, post_name:req.body.post_name, post_location:req.body.post_location, post_description:req.body.post_description}
    Posts.addPost(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
    });

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
    if(req.body === {}) {
        res.status(500).json({
            message: "No post with that ID"
        })
    } else {
    Posts.removePost(id)
    .then(removedPost => {
        if(removedPost) {
            res.json({
                removed: removedPost
            })
        } else {
            res.status(404).json({
                message: `Post with id ${id} not found`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}
})


module.exports = router;