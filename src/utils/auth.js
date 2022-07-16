const jwt = require("jsonwebtoken");
const db = require("./mongoDB");

/**
 * token validatior.
 */
const tokenValidator = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Invalid token",
        },
      });
    }

    db.collection("tokens").findOne({ user: decoded.user }, (err, data) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          err: {
            message: "Invalid token",
          },
        });
      }

      if (data.token) {
        next();
      } else {
        return res.status(401).json({
          ok: false,
          err: {
            message: "Invalid token",
          },
        });
      }
    });
  });
};

module.exports = { tokenValidator }; // Export instance to get access to this.db
