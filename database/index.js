const { Pool } = require("pg")

// Usa variáveis de ambiente definidas no .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // necessário no Render
})

module.exports = pool