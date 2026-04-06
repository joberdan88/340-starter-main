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

async function updateVehicle(inv_id, make, model, year, price, classification_id) {
    const sql = `
    UPDATE inventory
    SET inv_make = $1, inv_model = $2, inv_year = $3, inv_price = $4, classification_id = $5
    WHERE inv_id = $6
    RETURNING *`
    return pool.query(sql, [make, model, year, price, classification_id, inv_id])
}


async function deleteVehicle(inv_id) {
    const sql = "DELETE FROM inventory WHERE inv_id = $1"
    return pool.query(sql, [inv_id])
}

module.exports = {
    getVehicleById,
    getVehiclesByClassificationId,
    addClassification,
    addVehicle
}