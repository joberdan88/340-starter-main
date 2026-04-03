const utilities = require("../utilities/")

async function buildLogin(req, res) {
    const nav = await utilities.getNav()
    const message = req.session.message || null
    req.session.message = null // clear after showing
    res.render("account/login", { title: "Login", nav, message })
}

async function buildRegister(req, res) {
    const nav = await utilities.getNav()
    res.render("account/registration", { title: "Register", nav })
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
        return res.render("account/login", { title: "Login", nav, errors })
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