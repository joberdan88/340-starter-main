const express = require("express")
const router = new express.Router()
const invController = require("../controllers/inventory-controller")

// Route details veilcle
router.get("/detail/:invId", invController.buildById)

// Route classification veilcle
router.get("/classification/:classificationId", invController.buildByClassificationId)

// report new classification
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", invController.processAddClassification)

// report new veilcle
router.get("/add-vehicle", invController.buildAddVehicle)
router.post("/add-vehicle", invController.processAddVehicle)

module.exports = router