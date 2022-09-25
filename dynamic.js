const RegisterProductName = document.getElementById('RegisterProductName');
const registerCodeProduct = document.getElementById('registerCodeProduct');
const description = document.getElementById('description');
const stock = document.getElementById('stock');
const inventoryCostUnit = document.getElementById('inventoryCostUnit');
const formInventory = document.getElementById('formInventory');
const bodyTableInventory = document.getElementById('bodyTableInventory');

const sell = document.getElementById('sell');
const buy = document.getElementById('buy');
const movementProductName = document.getElementById('movementProductName');
const movementCodeProduct = document.getElementById('movementCodeProduct');
const date = document.getElementById('date');
const count = document.getElementById('count');
const basico = document.getElementById('basico');
const minimo = document.getElementById('minimo');
const exento = document.getElementById('exento');
const movementCostUnit = document.getElementById('movementCostUnit');
const totalCost = document.getElementById('movementCostUnit');
const formMovement = document.getElementById('formMovement');
const bodyTableMovement = document.getElementById('bodyTableMovement');
const arrayElements = [];
const positionElement = arrayElements.indexOf(movementCodeProduct.value);

function innerInventory(containeer, code, name, stock, costUnity) {
  let product = {
    id: code,
    name: name,
    description: description.value,
    stock: stock,
    costUnit: costUnity,
    inventory: true,
  };
  localStorage.setItem(code, JSON.stringify(product));
  containeer.innerHTML += `
    <tr class='el ${alertsStockInitial(stock)}'>
    <td>${code}</td>
    <td>${name}</td>
    <td>${description.value}</td>
    <td>${stock}</td>
    <td>$${costUnity}</td>
    </tr>
    `;
}
function innerMovements(transaccion, Iva, TotalWithIva, totalCost) {
  let product = {
    id: movementCodeProduct.value,
    transaccion: transaccion,
    date: date.value,
    name: movementProductName.value,
    count: count.value,
    costUnit: movementCostUnit.value,
    totalCost: totalCost,
    iva: Iva,
    TotalWithIva: TotalWithIva,
    inventory: false,
  };
  localStorage.setItem(movementCodeProduct.value, JSON.stringify(product));
  bodyTableMovement.innerHTML += `
    <tr>
    <td>${movementCodeProduct.value}</td>
    <td>${transaccion}</td>
    <td>${date.value}</td>
    <td>${movementProductName.value}</td>
    <td>${count.value}</td>
    <td>$${movementCostUnit.value}</td>
    <td>$${totalCost}</td>
    <td>${Iva}%</td>
    <td>$${TotalWithIva}</td>
    </tr>
    `;
}
function alertsStock(stock, positionElement) {
  if (stock > 500) {
    bodyTableInventory.children[positionElement].classList.add('table-success');
  }
  if (stock <= 500 && stock >= 150) {
    bodyTableInventory.children[positionElement].classList.add('table-warning');
  }
  if (stock < 150) {
    bodyTableInventory.children[positionElement].classList.add('table-danger');
  }
}
function alertsStockInitial(stock) {
  if (stock > 500) {
    return 'table-success';
  }
  if (stock <= 500 && stock >= 150) {
    return 'table-warning';
  }
  if (stock < 150) {
    return 'table-danger';
  }
}
function newStockInner(newStock, position) {
  bodyTableInventory.children[position].innerHTML = `
    <tr class='el ${alertsStockInitial(newStock)}'>
    <td>${movementCodeProduct.value}</td>
    <td>${movementProductName.value}</td>
    <td>${description.value}</td>
    <td>${newStock}</td>
    <td>$${movementCostUnit.value}</td>
    </tr>
    `;
}
let arraySells = [];
function sells() {
  let cuantity = parseInt(count.value);
  let unityValue = parseInt(movementCostUnit.value);
  let totalCost = cuantity * unityValue;
  let TotalWithivaBasico = parseInt(
    totalCost + (basico.value * totalCost) / 100
  );
  let TotalWithivaMinimo = parseInt(
    totalCost + (minimo.value * totalCost) / 100
  );
  let TotalWithivaExento = totalCost;
  if (bodyTableInventory.firstChild) {
    let totalSells = document.getElementById('totalSells');
    if (sell.checked && basico.checked) {
      innerMovements(sell.value, basico.value, TotalWithivaBasico, totalCost);
    }
    if (sell.checked && minimo.checked) {
      innerMovements(sell.value, minimo.value, TotalWithivaMinimo, totalCost);
    }
    if (sell.checked && exento.checked) {
      innerMovements(sell.value, exento.value, TotalWithivaExento, totalCost);
    }
    if (
      sell.checked &&
      arrayElements.includes(movementCodeProduct.value) === false
    ) {
      arrayElements.push(movementCodeProduct.value);
      return innerInventory(
        bodyTableInventory,
        movementCodeProduct.value,
        movementProductName.value,
        count.value,
        movementCostUnit.value
      );
    }
    if (sell.checked && arrayElements.includes(movementCodeProduct.value)) {
      const positionElement = arrayElements.indexOf(movementCodeProduct.value);
      const element = document.querySelectorAll('.el');
      const newStock =
        parseInt(element[positionElement].children[3].textContent) -
        parseInt(count.value);
      bodyTableInventory.children[positionElement].classList.remove(
        'table-danger'
      );
      bodyTableInventory.children[positionElement].classList.remove(
        'table-warning'
      );
      bodyTableInventory.children[positionElement].classList.remove(
        'table-success'
      );
      if (newStock >= 0 && sell.checked) {
        newStockInner(newStock, positionElement);
        alertsStock(newStock, positionElement);
        let unityValue = parseInt(movementCostUnit.value);
        let total = cuantity * unityValue;
        arraySells.push(total);
        const initialValue = 0;
        const sumWithInitial = arraySells.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          initialValue
        );
        totalSells.innerHTML = `Ventas Totales:$${sumWithInitial}`;
      }
      if (newStock < 0) {
        alert(
          `Tu stock es de ${element[positionElement].children[3].textContent}`
        );
        alertsStock(newStock, positionElement);
        bodyTableMovement.lastElementChild.remove();
      }
    }
  }
}

let arrayBuys = [];
function buys() {
  let cuantity = parseInt(count.value);
  let unityValue = parseInt(movementCostUnit.value);
  let totalCost = cuantity * unityValue;
  let TotalWithivaBasico = parseInt(
    totalCost + (basico.value * totalCost) / 100
  );
  let TotalWithivaMinimo = parseInt(
    totalCost + (minimo.value * totalCost) / 100
  );
  let TotalWithivaExento = totalCost;
  let totalBuys = document.getElementById('totalBuys');
  if (buy.checked) {
    let cuantity = parseInt(count.value);
    let unityValue = parseInt(movementCostUnit.value);
    let total = cuantity * unityValue;
    arrayBuys.push(total);
  }
  const initialValue = 0;
  const sumWithInitial = arrayBuys.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  totalBuys.innerHTML = `Compras Totales:$${sumWithInitial}`;

  if (buy.checked && basico.checked) {
    innerMovements(buy.value, basico.value, TotalWithivaBasico, totalCost);
  }
  if (buy.checked && minimo.checked) {
    innerMovements(buy.value, minimo.value, TotalWithivaMinimo, totalCost);
  }
  if (buy.checked && exento.checked) {
    innerMovements(buy.value, exento.value, TotalWithivaExento, totalCost);
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
    );
  }
  if (buy.checked && arrayElements.includes(movementCodeProduct.value)) {
    const positionElement = arrayElements.indexOf(movementCodeProduct.value);
    const element = document.querySelectorAll('.el');
    const newStock =
      parseInt(element[positionElement].children[3].textContent) +
      parseInt(count.value);
    bodyTableInventory.children[positionElement].classList.remove(
      'table-success'
    );
    bodyTableInventory.children[positionElement].classList.remove(
      'table-warning'
    );
    bodyTableInventory.children[positionElement].classList.remove(
      'table-danger'
    );
    newStockInner(newStock, positionElement);
    alertsStock(newStock, positionElement);
  }
}

formInventory.addEventListener('submit', (e) => {
  e.preventDefault();
  if (arrayElements.includes(registerCodeProduct.value) === false) {
    arrayElements.push(registerCodeProduct.value);
    return innerInventory(
      bodyTableInventory,
      registerCodeProduct.value,
      RegisterProductName.value,
      stock.value,
      inventoryCostUnit.value
    );
  } else if (arrayElements.includes(registerCodeProduct.value)) {
    alert('Ya tienes este articulo en el inventario');
  }
});
formMovement.addEventListener('submit', (e) => {
  e.preventDefault();
  buys();
  sells();
});

// let perfilUsuario = { id:1, nombre:"juan", apellidos:"garcias garcias"}
// localStorage.setItem('perfil', JSON.stringify(perfilUsurio))
//let perfil = JSON.parse(localStorage.getItem('perfil'))

function firstLoad() {
  let products = allStorage();
  for (let product of products) {
    product = JSON.parse(product);
    if (product.inventory) {
      bodyTableInventory.innerHTML += `
    <tr class='el ${alertsStockInitial(stock)}'>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.description}</td>
    <td>${product.stock}</td>
    <td>$${product.costUnit}</td>
    </tr>
    `;
    } else {
      console.log(product);
      bodyTableMovement.innerHTML += `
    <tr>
    <td>${product.id}</td>
    <td>${product.transaccion}</td>
    <td>${product.date}</td>
    <td>${product.name}</td>
    <td>${product.count}</td>
    <td>$${product.costUnit}</td>
    <td>$${product.totalCost}</td>
    <td>${product.iva}%</td>
    <td>$${product.TotalWithIva}</td>
    </tr>
    `;
    }
  }
}

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

firstLoad();
