
const db = require('../data/db-config.js')

module.exports = {
    getAllPosts() {
        return db('posts')
    },

    findById(id) {
        return db('posts')
        .where({ id : id }).first();
    },

    getAllPostsByUser(){
        return db('users')
        .join('posts', 'posts.user_id', 'users.id')
        .select('users.username', 'posts.post_name', 'posts.post_location', 'posts.post_description', 'posts.upvotes', 'posts.id')
    },

    addPost(post){
        return db('posts')
        .insert(post, "id")
        .then(ids => ids[0])
            // return db('posts')
            // .where({ id : id }).first();
    },

    // addItem(post, id) {
    //     post.user_id = id
    //     return db("posts").insert(post, "id");
    // },

    update(id, updates) {
        return db('posts')
          .where({ id })
          .update(updates)
      },

    removePost(id) {
        return db('posts')
        .where({ id : id })
        .delete()
    },
    add
}

async function add(post) {
    try {
      const [id] = await db("posts").insert(post, "id");
  
      return findById(id);
    } catch (error) {
      throw error;
    }
  }