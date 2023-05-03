const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const secret = process.env.SECRET;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, { algorithms: ["HS256"] }, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
