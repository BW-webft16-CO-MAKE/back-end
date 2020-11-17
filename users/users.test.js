const User = require("./users-model");
const db = require("../data/db-config.js");
const userObject = {
  username: "user",
  password: "testpass",
  email: "john@gmail.com",
  first_name: "johnn",
  last_name: "schulerr",
};
// each test starts with the SAME database
beforeEach(async () => {
  await db("users").truncate();
});

describe("users model", () => {
  describe("find()", () => {
    it("gets an empty array", async () => {
      const users = await User.find();
      expect(users).toHaveLength(0);
    });
    it("tests insert() gets all the users", async () => {
      await db("users").insert(userObject);
      let users = await User.find();
      expect(users).toHaveLength(1);
    });
  });
});

describe("remove()", () => {
  it("can remove", /* async */ () => {
    db("users")
      .insert(userObject)
      .then(() => {
        return User.remove(1);
      })
      .then(() => {
        return db("users");
      })
      .then((users) => {
        expect(users).toHaveLength(0);
      });
  });
});
