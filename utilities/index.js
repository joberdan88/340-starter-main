const classificationModel = require("../models/classification-model")

async function getNav() {
    try {
        const data = await classificationModel.getClassifications()
        let nav = "<ul>"
        data.rows.forEach(row => {
            nav += `<li><a href="/inv/type/${row.classification_id}">${row.classification_name}</a></li>`
        })
        nav += "</ul>"
        return nav
    } catch (error) {
        console.error("Error building nav:", error)
        throw error
    }
}

module.exports = { getNav }