
let arraySells = [];

const sells = () => {
    
    let positionElement = arrayElements.indexOf(movementCodeProduct.value);
    let cuantity = parseInt(count.value);
    let unityValue = parseInt(movementCostUnit.value);
    let totalCost = cuantity * unityValue;
    let element = document.querySelectorAll(".el");
    let totalSells = document.getElementById("totalSells");
    
    let totalWithivaBasico = parseInt(totalCost + (basico.value * totalCost) / 100)
    let totalWithivaMinimo = parseInt(totalCost + (minimo.value * totalCost) / 100)
    let totalWithivaExento = totalCost;
    
    if(arrayElements.includes(movementCodeProduct.value) == false){
        alert('No tienes stock de este articulo')
    }

    if(sell.checked && arrayElements.includes(movementCodeProduct.value)){
        if (sell.checked && basico.checked) {
            innerMovements(sell.value, basico.value, totalWithivaBasico, totalCost)
        }
        
        if (sell.checked && minimo.checked) {
            innerMovements(sell.value, minimo.value, totalWithivaMinimo, totalCost)
        }
        
        if (sell.checked && exento.checked) {
            innerMovements(sell.value, exento.value, totalWithivaExento, totalCost)
        }
        
        if (
            sell.checked &&
            arrayElements.includes(movementCodeProduct.value) === false
        ) {
            arrayElements.push(movementCodeProduct.value)
            return innerInventory(
                bodyTableInventory,
                movementCodeProduct.value,
                movementProductName.value,
                count.value,
                movementCostUnit.value
            )
        }

        if (sell.checked && arrayElements.includes(movementCodeProduct.value)){
            const positionElement = arrayElements.indexOf(movementCodeProduct.value);
            const newStock = parseInt(element[positionElement].children[3].textContent) - parseInt(count.value)
            
            bodyTableInventory.children[positionElement].classList.remove(
                "table-danger"
            )

            bodyTableInventory.children[positionElement].classList.remove(
                "table-warning"
            )

            bodyTableInventory.children[positionElement].classList.remove(
                "table-success"
            )

            if (newStock >= 0 && sell.checked) {
                newStockInner(newStock, positionElement)
                alertsStock(newStock, positionElement)
                
                let unityValue = parseInt(movementCostUnit.value)
                let total = cuantity * unityValue

                arraySells.push(total)
                
                const initialValue = 0
                const sumWithInitial = arraySells.reduce(
                    (previousValue, currentValue) => previousValue + currentValue,
                    initialValue
                )
                totalSells.innerHTML = `Ventas Totales:$${sumWithInitial}`
            }

            if (newStock < 0) {
                alert(
                    `Tu stock es de ${element[positionElement].children[3].textContent}`
                );
                alertsStock(newStock, positionElement)
                bodyTableMovement.lastElementChild.remove()
            }
        }
    }
}