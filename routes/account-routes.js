const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/account-controller")

router.get("/login", accountController.buildLogin)
router.post("/login", accountController.processLogin)

router.get("/register", accountController.buildRegister)
router.post("/register", accountController.processRegister)

router.get("/session-message", accountController.buildSessionMessage)

module.exports = router