const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized. Inavlid Token");
    }
  } catch (error) {
    next(error);
  }
};

const verifyIsAdmin = async (req, res, next) => {
  // try {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("Unauthorized. Admin required");
  }
};
//   catch (error) {
//     next(error);
//   }
// };

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
