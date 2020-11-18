const { jwtSecret } = require('../env/secrets.js')
const jwt = require('jsonwebtoken')
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
    res.status(401).json({
      message: 'you are not authorized to view this page'
      })
    }
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if(error) {
        res.status(401).json({
          message: 'token does not exist'
        })
      }
      req.decodedJWT = decodedToken
      console.log('decoded token ->', decodedToken)
      next()
    })
}


// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization;
//   const secret = process.env.JWT_SECRET || "This is a Secret";
//   const jwt = require("jsonwebtoken")

//   if (token) {
//     jwt.verify(token, secret, (err, decodedToken) => {
//       err
//         ? res.status(401).json({ message: "Not Authorized" })
//         : (req.jwt = decodedToken)
//         next()
//     });
//   } else {
//     res.status(401).json({ message: "No token found, please login again." });
//   }
// };

// module.exports = authenticate;
