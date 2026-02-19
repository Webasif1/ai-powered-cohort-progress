/**
 * Require jwt
 */
const jwt = require("jsonwebtoken")
/**
 *
 * @param {request token from cookies} req
 * @param {send status message} res
 * @param {*} next
 * @returns
 */
async function identifyUser(req, res, next){
   const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access.",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
    });
  }

  req.user = decoded

  next()

}

/**module.exports = identifyUser */
module.exports = identifyUser
