const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  token = token && token.split(" ")[0] === "Bearer" ? token.split(" ")[1] : token;
  

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};
