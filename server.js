/* ******************************************
 * Primary server file
 *******************************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const path = require("path")

// View engine
app.use(expressLayouts)
app.set("layout", "./layout") // not at views root
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Index route
app.get("/", (req, res) => {
  res.render("home", { title: "Home" })
})

// Local Server Information
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})