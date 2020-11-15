// user-model
const db = require("../data/db-config.js");

module.exports = {
  find() {
    return db("posts");
  },
  findById(id) {
    return db("posts").where({ id }).first();
  },
  add(user) {
    return db("posts").insert(user, "id");
  },
  update(id, changes) {
    return db("posts").where({ id }).update(changes);
  },
  remove(id) {
    return db("posts").where({ id }).del();
  },
};
