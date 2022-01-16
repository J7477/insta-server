const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.header('AuthToken')

    if (!authHeader) {
        req.isAuth = false
        return next()
    }
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'SECRETTOKEN')
    } catch {
        (err) => {
            req.isAuth = false;
            return next()
        }
    }
    if (!decodedToken) {
        req.isAuth = false
        return next()
    }
    req.isAuth = true
    req.userId = decodedToken.userId
    next()
}