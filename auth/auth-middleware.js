const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "This is a Secret";

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      err
        ? res.status(401).json({ message: "Not Authorized" })
        : (req.jwt = decodedToken);
    });
  } else {
    res.status(401).json({ message: "shall not pass!" });
  }
};

module.exports = authenticate;
