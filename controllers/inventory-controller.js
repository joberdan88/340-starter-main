const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

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

module.exports = { buildById }