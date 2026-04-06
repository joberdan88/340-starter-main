const utilities = require("../utilities/")


const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function loginUser(req, res) {
    const { email, password } = req.body
    const user = await accountModel.findUserByEmail(email)

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.render("account/login", { errors: ["Invalid credentials"], nav: await utilities.getNav() })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    res.cookie("jwt", token, { httpOnly: true })
    res.redirect("/inv")
}

function logoutUser(req, res) {
    res.clearCookie("jwt")
    res.redirect("/")
}


async function buildLogin(req, res) {
    const nav = await utilities.getNav()
    const message = req.session.message || null
    req.session.message = null // clear after showing
    res.render("account/login", { title: "Login", nav, message })
}

async function buildRegister(req, res) {
    const nav = await utilities.getNav()
    const message = req.session.message || null
    req.session.message = null // clear after showing
    res.render("account/registration", { title: "Register", nav, message })
}

async function processRegister(req, res) {
    const nav = await utilities.getNav()
    const { firstname, lastname, email, password } = req.body || {}

    let errors = []
    if (!firstname || !lastname || !email || !password) {
        errors.push("All fields are required.")
    }
    if (password && password.length < 8) {
        errors.push("Password must be at least 8 characters.")
    }
    if (email && !email.includes("@")) {
        errors.push("Invalid email format.")
    }

    if (errors.length > 0) {
        return res.render("account/registration", { title: "Register", nav, errors })
    }

    // Store success message in session
    req.session.message = `Registration successful for ${firstname} ${lastname}`
    res.redirect("/account/session-message")
}

async function processLogin(req, res) {
    const nav = await utilities.getNav()
    const { email, password } = req.body || {}

    let errors = []
    if (!email || !password) {
        errors.push("Email and password are required.")
    }
    if (password && password.length < 8) {
        errors.push("Password must be at least 8 characters.")
    }
    if (email && !email.includes("@")) {
        errors.push("Invalid email format.")
    }

    if (errors.length > 0) {
        // Redirect to register if login fails
        req.session.message = "Login failed. Please register."
        return res.redirect("/account/register")
    }

    // Store login attempt message in session
    req.session.message = `Login attempt with email: ${email}`
    res.redirect("/account/session-message")
}

async function buildSessionMessage(req, res) {
    const nav = await utilities.getNav()
    const message = req.session.message || "No message found."
    req.session.message = null // clear after showing
    res.render("account/session-message", { title: "Message", nav, message })
}

module.exports = {
    buildLogin,
    buildRegister,
    processRegister,
    processLogin,
    buildSessionMessage
}