const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization")
  if (!authHeader) {
    req.isAuthorized = false
    return next()
  }

  const token = authHeader.split(" ")[1]
  if (!token || token === '') {
    req.isAuthorized = false
    return next()
  }

  try {
    const decodedToken = jwt.verify(token, "supersecrettoken")
    if (!decodedToken) {
      throw new Error("Unable to decode token")
    }

    req.isAuthorized = true
    req.userId = decodedToken.userId
    next()

  } catch (error) {
    console.log("Authentication Verification failed", error)
    req.isAuthorized = false
    return next()
  }
}