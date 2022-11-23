const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return response
      .status(401)
      .json({ message: "You not authorized to access this resource." });

  jwt.verify(token, process.env.SECRET, (error, user) => {
    if (error) {
      return response.status(403);
    }
    request.UserInfo = user.UserInfo;
    next();
  });
};

module.exports = authenticateToken;
