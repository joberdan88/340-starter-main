const express = require("express")
const router = express.Router()
const accountController = require("../controllers/account-controller")
const checkJWT = require("../utilities/checkJWT")

// Account Management
router.get("/management", checkJWT, accountController.buildManagement)

// Update account info
router.get("/update/:account_id", checkJWT, accountController.buildUpdateAccount)
router.post("/update", checkJWT, accountController.processUpdateAccount)

// Update password
router.post("/update-password", checkJWT, accountController.processUpdatePassword)

// Logout
router.get("/logout", accountController.logoutUser)

module.exports = router