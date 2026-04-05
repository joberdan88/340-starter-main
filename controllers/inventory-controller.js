const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

// Página principal de Inventory Management
async function buildInventory(req, res, next) {
    try {
        const nav = await utilities.getNav()
        res.render("inventory/management", {
            title: "Inventory Management",
            nav,
            message: "Choose an option below to manage classifications and vehicles."
        })
    } catch (error) {
        next(error)
    }
}

// Build vehicle detail page by vehicle ID
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

// Build classification page by classification ID
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

// Show form to add a new classification
async function buildAddClassification(req, res) {
    const nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null // Pass errors as null initially
    })
}

// Process form submission for new classification
async function processAddClassification(req, res) {
    const nav = await utilities.getNav()
    const { classification_name } = req.body || {}

    let errors = []
    if (!classification_name) {
        errors.push("Classification name is required.")
    }

    if (errors.length > 0) {
        return res.render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors
        })
    }

    await invModel.addClassification(classification_name)

    res.render("inventory/classification-success", {
        title: "Success",
        nav,
        classification_name,
        errors: null
    })
}

// Show form to add a new vehicle
async function buildAddVehicle(req, res) {
    const nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()
    res.render("inventory/add-vehicle", {
        title: "Add Vehicle",
        nav,
        classificationList,
        errors: null,
        make: "",
        model: "",
        year: "",
        price: ""
    })
}

// Process form submission for new vehicle
async function processAddVehicle(req, res) {
    const nav = await utilities.getNav()
    const { make, model, year, price, classification_id } = req.body || {}

    let errors = []
    if (!make || !model || !year || !price || !classification_id) {
        errors.push("All fields are required.")
    }

    if (errors.length > 0) {
        const classificationList = await utilities.buildClassificationList(classification_id)
        return res.render("inventory/add-vehicle", {
            title: "Add Vehicle",
            nav,
            errors,
            make,
            model,
            year,
            price,
            classification_id,
            classificationList
        })
    }

    await invModel.addVehicle(make, model, year, price, classification_id)

    res.render("inventory/vehicle-success", {
        title: "Success",
        nav,
        make,
        model
    })
}

module.exports = {
    buildInventory,
    buildById,
    buildByClassificationId,
    buildAddClassification,
    processAddClassification,
    buildAddVehicle,
    processAddVehicle
}