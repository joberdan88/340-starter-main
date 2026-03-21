const express = require("express")
const router = new express.Router()
const baseController = require("../controllers/base-controller")

router.get("/", baseController.buildHome)

module.exports = router