const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json("Token not valid!");
    req.userId = payload.id;
    req.isAdmin = payload.isAdmin;
    next();
  });
};

// const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers.token;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         res.status(403).json("Token is not valid!");
//       } else {
//         req.user = decoded;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json("You are not authenticated!");
//   }
// };

// const verifyTokenAndAuth = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not authorized!");
//     }
//   });
// };

// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     console.log(req.user)
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not Admin!");
//     }
//   });
// };

module.exports = { verifyToken };
