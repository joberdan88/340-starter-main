const utilities = require("../utilities/")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")

// Render login form
async function buildLogin(req, res) {
    const nav = await utilities.getNav()
    res.render("account/login", { title: "Login", nav, errors: null })
}

// Process login
async function loginUser(req, res) {
    const { email, password } = req.body
    const userData = await accountModel.findUserByEmail(email)

    if (!userData || !bcrypt.compareSync(password, userData.password)) {
        const nav = await utilities.getNav()
        return res.render("account/login", {
            title: "Login",
            nav,
            errors: ["Invalid credentials"]
        })
    }

    // Create JWT
    const token = jwt.sign(
        { userId: userData.account_id, email: userData.email, account_type: userData.account_type, first_name: userData.first_name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    )

    res.cookie("jwt", token, { httpOnly: true })
    res.redirect("/account/management")
}

// Logout
function logoutUser(req, res) {
    res.clearCookie("jwt")
    res.redirect("/")
}

// Render registration form
async function buildRegister(req, res) {
    const nav = await utilities.getNav()
    res.render("account/registration", { title: "Register", nav, errors: null })
}

// Process registration
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

    const hashedPassword = bcrypt.hashSync(password, 10)
    await accountModel.registerAccount(firstname, lastname, email, hashedPassword)

    res.redirect("/account/login")
}

// Account Management view
async function buildManagement(req, res) {
    const nav = await utilities.getNav()
    const user = req.user // vem do JWT
    res.render("account/management", {
        title: "Account Management",
        nav,
        user
    })
}

// Show update account form
async function buildUpdateAccount(req, res) {
    const nav = await utilities.getNav()
    const account = await accountModel.getAccountById(req.params.account_id)
    res.render("account/update", {
        title: "Update Account",
        nav,
        ...account.rows[0],
        errors: []
    })
}

// Process account update
async function processUpdateAccount(req, res) {
    const { account_id, first_name, last_name, email } = req.body
    await accountModel.updateAccount(account_id, first_name, last_name, email)
    res.redirect("/account/management")
}

// Process password update
async function processUpdatePassword(req, res) {
    const { account_id, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    await accountModel.updatePassword(account_id, hashedPassword)
    res.redirect("/account/management")
}

module.exports = {
    buildLogin,
    loginUser,
    logoutUser,
    buildRegister,
    processRegister,
    buildManagement,
    buildUpdateAccount,
    processUpdateAccount,
    processUpdatePassword
}