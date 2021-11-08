const clickbutton = document.querySelectorAll('.button')//Me traigo todos los button, que basicamente son todos los de agregar al carrito. 
const tbody = document.querySelector('.tbody')
let carrito = []

clickbutton.forEach(btn => {//Recorro todos los button, los guardo como btn y por cada click, le aplico la funcion createItemCarrito
  btn.addEventListener('click', createItemCarrito)
})

function createItemCarrito(e){//Por cada evento (click btn), armo el carrito, separando nombre, titulo, precio, imagen y cantidad. 
  const button = e.target
  const item = button.closest('.card')//Uso el motodo closest para traerme de cada evento, el target entero y lo guardo en item. No lo hago con querySelector porque la info la estoy sacando de un evento
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addNewItemToCarrito(newItem)
}

function addNewItemToCarrito(newItem) {

  const inputElement = tbody.getElementsByClassName('input__elemento')
  
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {  //Pregunto si ya existe en el carrito un repuesto igual, si es asi, le sumo 1, sino, lo creo.
      carrito[i].cantidad++;
      const inputValue = inputElement[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }

  carrito.push(newItem)

  renderCarrito()
}

function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio * item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e) {
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for (let i = 0; i < carrito.length; i++) {

    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  
  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e) {
  const sumaInput = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
}



$(`#Adquirir`).click(function() {
  $(`header`).append(
    `<h5 class="adquirido"> Adquirido</h5>`
  )
})







