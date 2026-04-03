const pool = require("../database/")

// Busca veículo pelo ID
async function getVehicleById(invId) {
    return pool.query(
        "SELECT * FROM inventory WHERE inv_id = $1",
        [invId]
    )
}

// Busca veículos por classificação
async function getVehiclesByClassificationId(classificationId) {
    return pool.query(
        "SELECT * FROM inventory JOIN classification USING (classification_id) WHERE classification_id = $1",
        [classificationId]
    )
}

// Inserir nova classificação
async function addClassification(classification_name) {
    return pool.query(
        "INSERT INTO classification (classification_name) VALUES ($1)",
        [classification_name]
    )
}

// Inserir novo veículo
async function addVehicle(make, model, year, price, classification_id) {
    return pool.query(
        "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price, classification_id) VALUES ($1, $2, $3, $4, $5)",
        [make, model, year, price, classification_id]
    )
}

module.exports = {
    getVehicleById,
    getVehiclesByClassificationId,
    addClassification,
    addVehicle
}