/* ******************************************
 * Primary server file
 *******************************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config({ path: ".env.sample" })
const app = express()
const path = require("path")
const session = require("express-session") // session support

// Middleware first
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configure session
app.use(session({
  secret: "superSecretKey", // change to a secure key in production
  resave: false,
  saveUninitialized: true
}))

// Routes
const accountRoutes = require("./routes/account-routes")
app.use("/account", accountRoutes)

// View engine
app.use(expressLayouts)
app.set("layout", "layout")
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Other routes
const baseRoutes = require("./routes/base-routes")
app.use("/", baseRoutes)

const invRoutes = require("./routes/inventory-routes")
// Mantendo o prefixo /inv
app.use("/inv", invRoutes)

// Local Server Information
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})

// 404 Error handler
app.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})

const utilities = require("./utilities/")

// General error handler
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.status(err.status || 500)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})