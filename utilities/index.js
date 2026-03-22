const classificationModel = require("../models/classification-model")

// Função para montar o menu de navegação
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

// Função para montar os detalhes do veículo
function buildVehicleDetail(data) {
    const v = data.rows[0]
    let html = `
    <section class="vehicle-detail">
      <h2>${v.inv_make} ${v.inv_model}</h2>
      <img src="${v.inv_image}" alt="Image of ${v.inv_make} ${v.inv_model}">
      <p><strong>Price:</strong> $${v.inv_price.toLocaleString()}</p>
      <p><strong>Mileage:</strong> ${v.inv_miles.toLocaleString()} miles</p>
      <p><strong>Description:</strong> ${v.inv_description}</p>
    </section>
  `
    return html
}

module.exports = { getNav, buildVehicleDetail }