module.exports = {
  find() {
    return db("users");
  },
  findById(id) {
    return db("users").where({ id }).first();
  },
  create(user) {
    const [id] = db("users").insert(user);
    return db("users").where({ id }).first();
  },
  update(id, changes) {
    return db("users").where({ id }).update(changes);
  },
  remove(id) {
    return db("users").where({ id }).del();
  },
};
