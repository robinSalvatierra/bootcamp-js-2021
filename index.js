const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];

const cantidadTotalElement = document.getElementById("cantidad-total")
const precioTotalElement = document.getElementById("precio-total")
const granTotalElement = document.getElementById("gran-total")
/** @type {HTMLInputElement}  */
const inputNombre = document.getElementById("nombre")
/** @type {HTMLInputElement}  */
const inputCantidad = document.getElementById("cantidad")
/** @type {HTMLInputElement}  */
const inputPrecio = document.getElementById("precio")
const selectCategoria = document.getElementById("categoria")
const inputCodigo = document.getElementById("codigo")

let indice = 0;
let cantidadTotal = 0;
let preciosTotatles = 0;
let granTotal = 0;
let currentlow;

form.addEventListener("submit", onSubmit);

/**
 * 
 * @param {Event} event 
 */
function onSubmit(event) {
    event.preventDefault();

    const data = new FormData(form)
    const values = Array.from(data.entries());

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values

    let codigo = frmCodigo[1]

    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    const total = cantidad * precio;


    cantidadTotal = parseFloat(cantidad) + cantidadTotal;
    preciosTotatles = parseFloat(precio) + preciosTotatles;
    granTotal = parseFloat(total) + granTotal;


    let tr;
    if(!codigo){//si no tiene ningun valor
        indice++;
        codigo = indice;
        tr = document.createElement("tr")
        tbody.appendChild(tr)
    }
    else{
        tr = currentlow;
    }

    

    
    tr.dataset.categoria = categoria;
    tr.innerHTML = `
    <td>${codigo}</td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    <td>${total}</td>
    <td><a href="#" onclick="onEdit(event)">Editar</a>|<a href="#" onclick="onDelete(event)">Eliminar</a></td>`
   


    cantidadTotalElement.innerText = cantidadTotal
    precioTotalElement.innerText = preciosTotatles
    granTotalElement.innerText = granTotal

    form.reset();
}

/**
 * @param {Event} event 
 */
function onEdit(event) {
    console.log("edit")
    event.preventDefault();


     /** @type {HTMLElement}  */
     const anchor = event.target //refernecia al elemento html
    const tr =   anchor.parentElement.parentElement;
    const celdas = tr.getElementsByTagName("td");
    const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;


    inputNombre.value = tdNombre.innerText;
    inputCantidad.value = tdCantidad.innerText;
    inputPrecio.value = tdPrecio.innerText;
    selectCategoria.value = tr.dataset.categoria
    inputCodigo.value = tdCodigo.innerText;

    currentlow = tr;
 
}

/**
 * @param {Event} event 
 */
function onDelete(event) {
    console.log("delte")
    event.preventDefault();

    /** @type {HTMLElement}  */
    const anchor = event.target //refernecia al elemento html
    const tr =   anchor.parentElement.parentElement;


    tbody.removeChild(tr);

}