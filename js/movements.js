const innerMovements = (transaction, iva, totalWithIva, totalCost) => {
    bodyTableMovement.innerHTML += `
    <tr>
        <td>${movementCodeProduct.value}</td>
        <td>${transaction}</td>
        <td>${date.value}</td>
        <td>${movementProductName.value}</td>
        <td>${count.value}</td>
        <td>$${movementCostUnit.value}</td>
        <td>$${totalCost}</td>
        <td>${iva}%</td>
        <td>$${totalWithIva}</td>
    </tr>
    `
}