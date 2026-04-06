async function getAccountById(account_id) {
    const sql = "SELECT * FROM account WHERE account_id = $1"
    return pool.query(sql, [account_id])
}

async function updateAccount(account_id, first_name, last_name, email) {
    const sql = `
    UPDATE account
    SET first_name = $1, last_name = $2, email = $3
    WHERE account_id = $4
    RETURNING *`
    return pool.query(sql, [first_name, last_name, email, account_id])
}

async function updatePassword(account_id, hashedPassword) {
    const sql = `
    UPDATE account
    SET password = $1
    WHERE account_id = $2
    RETURNING *`
    return pool.query(sql, [hashedPassword, account_id])
}

module.exports = { getAccountById, updateAccount, updatePassword }