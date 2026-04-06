const jwt = require("jsonwebtoken")

function checkJWT(req, res, next) {
    const token = req.cookies.jwt
    if (!token) return res.redirect("/account/login")

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = payload
        next()
    } catch (err) {
        res.clearCookie("jwt")
        return res.redirect("/account/login")
    }
}

module.exports = checkJWT