const pool = require("../database/")

async function getClassifications() {
    try {
        const data = await pool.query("SELECT * FROM classification ORDER BY classification_name")
        return data
    } catch (error) {
        console.error("Database error:", error)
        throw error
    }
}

module.exports = { getClassifications }