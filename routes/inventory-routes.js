const express = require("express")
const router = new express.Router()
const invController = require("../controllers/inventory-controller")


// Rota para abrir formulário de edição
router.get("/edit/:inv_id", invController.buildEditVehicle)

// Rota para processar atualização
router.post("/update", invController.processUpdateVehicle)

module.exports = router



// Página principal de Inventory Management
router.get("/", invController.buildInventory)

// Route details vehicle
router.get("/detail/:invId", invController.buildById)

// Route classification vehicle
router.get("/classification/:classificationId", invController.buildByClassificationId)

// report new classification
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", invController.processAddClassification)

// report new vehicle
router.get("/add-vehicle", invController.buildAddVehicle)
router.post("/add-vehicle", invController.processAddVehicle)

module.exports = router