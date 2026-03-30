const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

// Detalhes de um veículo pelo ID
async function buildById(req, res, next) {
    try {
        const invId = req.params.invId
        const data = await invModel.getVehicleById(invId)
        const nav = await utilities.getNav()
        const html = utilities.buildVehicleDetail(data)
        res.render("inventory/detail", {
            title: data.rows[0].inv_make + " " + data.rows[0].inv_model,
            nav,
            html
        })
    } catch (error) {
        next(error)
    }
}

// Veículos por classificação
async function buildByClassificationId(req, res, next) {
    try {
        const classificationId = req.params.classificationId
        const data = await invModel.getVehiclesByClassificationId(classificationId)
        const nav = await utilities.getNav()
        const grid = utilities.buildClassificationGrid(data.rows)
        const className = data.rows[0]?.classification_name || "Vehicles"

        res.render("inventory/classification", {
            title: className + " vehicles",
            nav,
            grid
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { buildById, buildByClassificationId }