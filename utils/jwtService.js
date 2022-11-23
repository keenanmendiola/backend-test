const jwt = require("jsonwebtoken");

const createToken = (details) => {
  return jwt.sign(details, "11235813", {
    expiresIn: 86400,
  });
};

module.exports = {
  createToken,
};
