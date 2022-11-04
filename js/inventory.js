const innerInventory = (container, code, name, stock, costUnity) => {
    container.innerHTML += `
        <tr class='el ${alertsStockInitial(stock)}'>
            <td>${code}</td>
            <td>${name}</td>
            <td>${description.value}</td>
            <td>${stock}</td>
            <td>$${costUnity}</td>
        </tr>
    `;
}
