const crypto = require("crypto");
// Hàm này chứa Function để Hash Password (Băm password)
const hashPassword = (plainPassword) => {
  const salt = crypto.randomBytes(16).toString("hex"); // tao nen Unique cho password
  const encyptedPassword = crypto
    .pbkdf2Sync(plainPassword, salt, 1000, 64, "sha512")
    .toString("hex");
  return {
    encyptedPassword,
    salt,
  };
};
const hashPasswordAlreadyHaveSalt = (plainPassword, salt) => {
  const encyptedPassword = crypto
    .pbkdf2Sync(plainPassword, salt, 1000, 64, "sha512")
    .toString("hex");
  return {
    encyptedPassword,
  };
};
module.exports = {
  hashPassword,
  hashPasswordAlreadyHaveSalt,
};
