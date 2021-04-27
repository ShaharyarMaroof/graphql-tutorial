const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization")

    if (!authHeader) {
      throw new Error("No Authorization Header present")
    }

    const token = authHeader.split(" ")[1]
    if (!token || token === '') {
      throw new Error("No Token present")
    }

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