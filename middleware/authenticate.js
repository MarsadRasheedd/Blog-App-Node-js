const jwt = require('jsonwebtoken');

// authorization for api's

const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decode
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message: "Token expired."
      });
    }

    res.json({
      message: "Authentication failed."
    });
  }
}

module.exports = authenticate;
