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
  async remove(id) {
    const user = await db("users").where({ id }).first();
    if (!user) return Promise.resolve(null);
    await db("schemes").where({ id }).del();
    return Promise.resolve(user);
  },
};
