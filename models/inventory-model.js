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

module.exports = { getVehicleById, getVehiclesByClassificationId }