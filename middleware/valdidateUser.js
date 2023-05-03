function validateUser(req, res, next) {
    regex = /[0-9!@#$%^&*(),.?":{}|<>]/g;
    if (req.body.age < 0 || regex.test(req.body.fullname)) {
      res.status(400).send("Invalid input");
    } else next();
  }

module.exports = validateUser;