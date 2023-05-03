const express = require("express");
const user_router = express.Router();
const connection = require("../database/connection");

user_router.get("/", (req, res) => {
  connection.query("Select * from Users", (err, result) => {
    const mappedResult = result.map((row) => {
      return {
        ...row,
        gender: row.gender === 1 ? true : false,
      };
    });
    res.json(mappedResult);
  });
});
user_router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = saveDatabase.find((user) => user.id === parseInt(id));
  if (!user) {
    res.status(404).send("User not found");
  }
  res.send(user);
});
user_router.post("/", (req, res) => {
  const user = {
    id: Date.now(),
    fullname: req.body.fullname,
    gender: req.body.gender,
    age: req.body.age,
  };
  saveDatabase.push(user);
  res.send(req.body);
});
user_router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const user = saveDatabase.find((user) => user.id === parseInt(id));
  if (!user) {
    res.status(404).send("User not found");
  }
  const index = saveDatabase.indexOf(user);
  saveDatabase.splice(index, 1);
  res.status(204).send("No content");
});

user_router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = saveDatabase.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.password == password) {
    const jwt = jsonwebtoken.sign(
      {
        username: user.username,
        password: user.password,
      },
      secret,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );
    return res.json({ data: user }, { token: jwt });
  }
  return res.status(401).json({ message: "Unauthorized" });
});
user_router.get("/auth/me", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decode = jsonwebtoken.verify(token, secret);
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});
module.exports = user_router;
