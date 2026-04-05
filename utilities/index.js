const classificationModel = require("../models/classification-model")

async function getNav() {
  const data = await classificationModel.getClassifications()
  let nav = "<ul>"
  data.rows.forEach(row => {
    nav += `<li><a href="/inv/classification/${row.classification_id}">${row.classification_name}</a></li>`
  })
  nav += "</ul>"
  return nav
}

function buildVehicleDetail(data) {
  const v = data.rows[0]
  return `
    <section class="vehicle-detail">
      <h2>${v.inv_make} ${v.inv_model}</h2>
      <img src="${v.inv_image}" alt="Image of ${v.inv_make} ${v.inv_model}">
      <p><strong>Price:</strong> $${v.inv_price.toLocaleString()}</p>
      <p><strong>Mileage:</strong> ${v.inv_miles.toLocaleString()} miles</p>
      <p><strong>Description:</strong> ${v.inv_description}</p>
    </section>
  `
}

function buildClassificationGrid(data) {
  let grid = "<ul class='vehicle-grid'>"
  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
          <div>${vehicle.inv_make} ${vehicle.inv_model}</div>
          <div>$${vehicle.inv_price.toLocaleString()}</div>
        </a>
      </li>
    `
  })
  grid += "</ul>"
  return grid
}

// Novo utilitário para gerar o select de classificações
async function buildClassificationList(classification_id = null) {
  let data = await classificationModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

module.exports = {
  getNav,
  buildVehicleDetail,
  buildClassificationGrid,
  buildClassificationList
}