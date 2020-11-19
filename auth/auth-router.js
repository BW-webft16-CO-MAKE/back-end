const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");
const { jwtSecret } = require('../env/secrets')

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body
  if(credentials) {
    const rounds = process.env.ROUNDS || 12;
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash;
    Users.add(credentials)
      .then(user => {
        res.status(201).json({
          data: user
        })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: "Sorry we could not log you in please check your credentials and try again"
        })
      })

  } else {
    res.status(400).json({
      message: "please provide a username and password that meets our guidelines"
    })
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function makeJwt({ id, username }) {
  const payload = {
    username,
    id,
  };
  const options = {
    expiresIn: "8 hours",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
