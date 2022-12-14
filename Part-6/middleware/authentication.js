const jwt = require("jsonwebtoken");
require("dotenv").config;

function varifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
}

const authenticate = async (req, res, next) => {
  console.log(req.cookies);

  if (req.cookies.key==undefined) {
    res.redirect('/login');
    return;
  }

  let token = req.cookies.key;
  console.log(token);
  let decoded;

  try {
    decoded = await varifyToken(token);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  }

  // req.user = decoded.user;

  return next();
};

module.exports = authenticate;
