/* ******************************************
 * Primary server file
 *******************************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config({ path: ".env.sample" })
const app = express()
const path = require("path")

// View engine
app.use(expressLayouts)
app.set("layout", "./layout") // not at views root
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
const baseRoutes = require("./routes/base-routes")
app.use("/", baseRoutes)

const invRoutes = require("./routes/inventory-routes")
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

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render("errors/error", {
    title: "Error",
    message: err.message,
    status: err.status || 500
  })
})