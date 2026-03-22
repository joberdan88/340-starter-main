const pool = require("../database/")

async function getVehicleById(invId) {
    return pool.query(
        "SELECT * FROM inventory WHERE inv_id = $1",
        [invId] // Prepared Statement
    )
}

module.exports = { getVehicleById }