
let arrayBuys = []

const buys = () => {

    let cuantity = parseInt(count.value)
    let unityValue = parseInt(movementCostUnit.value)
    let totalCost = cuantity * unityValue
    let totalWithivaBasico = parseInt(totalCost + (basico.value * totalCost) / 100)
    let totalWithivaMinimo = parseInt(totalCost + (minimo.value * totalCost) / 100)
    let totalWithivaExento = totalCost;
    let totalBuys = document.getElementById("totalBuys")
    
    if (buy.checked) {
        let cuantity = parseInt(count.value)
        let unityValue = parseInt(movementCostUnit.value)
        let total = cuantity * unityValue
        arrayBuys.push(total)
    }

    const initialValue = 0
    const sumWithInitial = arrayBuys.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    )
    totalBuys.innerHTML = `Compras Totales:$${sumWithInitial}`;

    if (buy.checked && basico.checked) {
        innerMovements(buy.value, basico.value, totalWithivaBasico, totalCost)
    }

    if (buy.checked && minimo.checked) {
        innerMovements(buy.value, minimo.value, totalWithivaMinimo, totalCost)
    }

    if (buy.checked && exento.checked) {
        innerMovements(buy.value, exento.value, totalWithivaExento, totalCost)
    }

    if (
        buy.checked &&
        arrayElements.includes(movementCodeProduct.value) === false
    ) {
        arrayElements.push(movementCodeProduct.value);
        return innerInventory(
            bodyTableInventory,
            movementCodeProduct.value,
            movementProductName.value,
            count.value,
            movementCostUnit.value
        )
    }

    if (buy.checked && arrayElements.includes(movementCodeProduct.value)){
        const positionElement = arrayElements.indexOf(movementCodeProduct.value)
        const element = document.querySelectorAll(".el")
        const newStock = parseInt(element[positionElement].children[3].textContent) + parseInt(count.value)
        
        bodyTableInventory.children[positionElement].classList.remove(
            "table-success"
        )

        bodyTableInventory.children[positionElement].classList.remove(
            "table-warning"
        )

        bodyTableInventory.children[positionElement].classList.remove(
            "table-danger"
        )

        newStockInner(newStock, positionElement)
        alertsStock(newStock, positionElement)
    }
}

    