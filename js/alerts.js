const alertsStock = (stock, positionElement) => {
    if (stock > 500) {
        bodyTableInventory.children[positionElement].classList.add("table-success");
    }

    if (stock <= 500 && stock >= 150) {
        bodyTableInventory.children[positionElement].classList.add("table-warning");
    }
    
    if (stock < 150) {
        bodyTableInventory.children[positionElement].classList.add("table-danger");
    }
}

const alertsStockInitial = (stock) => {
    if (stock > 500) {
        return "table-success";
    }

    if (stock <= 500 && stock >= 150) {
        return "table-warning";
    }

    if (stock < 150) {
        return "table-danger";
    }
}