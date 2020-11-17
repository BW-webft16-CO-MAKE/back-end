const supertest = require("supertest");
const server = require("./server.js");
const db = require("../data/db-config");
const auth = require("../auth/auth-middleware");

const userObject = {
  username: "user",
  password: "testpass",
  email: "john@gmail.com",
  first_name: "johnn",
  last_name: "schulerr",
};
var token = "";
describe("router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("server", () => {
    it("it should return status code 200", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
  describe("server", () => {
    it("it should return status code 201", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send(userObject)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });
  describe("server", () => {
    it("fail no password 400", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send()
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
  });
  describe("server", () => {
    it("fail no username 400", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          password: "testpass",
          email: "john@gmail.com",
          first_name: "johnn",
          last_name: "schulerr",
        })
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe("server", () => {
    it("it should return status code 200", () => {
      return supertest(server)
        .get("/api/users")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});
