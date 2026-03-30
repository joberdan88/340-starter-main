const express = require("express")
const router = new express.Router()
const invController = require("../controllers/inventory-controller")

// Rota para detalhes do veículo
router.get("/detail/:invId", invController.buildById)

// Rota para veículos por classificação
router.get("/classification/:classificationId", invController.buildByClassificationId)

module.exports = router