// user-model
const db = require("../data/db-config.js");

module.exports = {
  find() {
    return db("users");
  },
  findBy(filter) {
    return db("users")
      .where(filter)
      .orderBy("users.id")
      .select("users.id", "users.username", "users.password");
  },
  findById(id) {
    return db("users").where({ id }).first();
  },
  add(user) {
    return db("users").insert(user);
  },
  update(id, changes) {
    return db("users").where({ id }).update(changes);
  },
  remove(id) {
    return db("users").where({ id }).del();
  },

  addPost(postData) {
    return db("posts")
      .insert(postData, "id")
      .then((ids) => {
        return ids[0];
      });
  },

  getPost(id) {
    return db("posts")
      .join("users", "user_id", "=", "posts.id")
      .select("username", "post_name", "post_description", "post_location")
      .where({ id });
  },
};
