const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  console.log("checkToken", req.headers.token);
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authenication",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (payload.role === "manager" || payload.role === "finance") {
      next();
    } else {
      return res.status(404).json({
        message: "Is not an admin",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleware,
};
