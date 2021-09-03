// Variables

const cuerpo = document.querySelector('body')
const carrito = document.querySelector('#carrito');
const imgCarro = document.querySelector('#img-carrito');
const contendorCarrrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Muestra el carrito
    imgCarro.addEventListener('click', mostrar);

    //muestra los cusros del localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
      articulosCarrito = [];
      LimpiarHTML(); //Eliminamos todo el html  
    })
}



// Funciones


function mostrar() {
    carrito.classList.toggle('prueba2');
}


function agregarCurso(e) {
    // e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }
    // carrito.classList.toggle("prueba2");
    carrito.classList.add("prueba2");
}

// Eliminar un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML(); //Se vuelve a iterar sobre el carrito y mostrar su HTML
    }
}

//lee el contenido del html al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){
    //crear un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else {
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML() {

    //Limpiar el HTML
    LimpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src ="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href = "#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //Agreaga el HTML del carrito en el tbody
        contendorCarrrito.appendChild(row);
    });

    //agregar el carrito de compras al localStorage
    sinconizarStorage();

}

function sinconizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Eliminar los cursos del tbody
function LimpiarHTML() {
    //forma lenta
    // contendorCarrrito.innerHTML = "";

    while(contendorCarrrito.firstChild) {
        contendorCarrrito.removeChild(contendorCarrrito.firstChild);
    }
}