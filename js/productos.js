import { remeras, shorts, pantalones, bikinis } from "./data/productos-data.js";

/* Navbar */

let carritonumerocantidadproductos = document.querySelector('.numero-de-carrito');
let carritoalmacenadolocalstorage = JSON.parse(localStorage.getItem('carrito')) || [];

function ActualizarNumeroDeProductos() {
    if (carritonumerocantidadproductos) {
        carritonumerocantidadproductos.innerText = carritoalmacenadolocalstorage.length;
    }
}

// Actualizamos el número de productos al cargar la página
ActualizarNumeroDeProductos();

/* FIN Navbar */

/*                           

INDICE:
1. Funciones
2. Filtros Categorías Funcionamiento
3. Filtro Categoría Show/Hide
4. Local Storage P. Carrito 

*/

/* Funciones */
const productoscontainer = document.querySelector('.productos-mostrados-container');

function QuitarProductos() {
    productoscontainer.innerHTML = ''
}

function MostrarProductos(productos) {
    productos.map((e) => {
        /* Creando elementos y agregando sus clases */
        let container = document.createElement('div');
        container.classList.add('container-producto-individual');
        container.id = e.id;

        let img = document.createElement('img');
        let titulo = document.createElement('h3');
        let stock = document.createElement('div');
        stock.classList.add('enstock');
        let precio = document.createElement('span');
        let marca = document.createElement('p');
        let btnagregaralcarrito = document.createElement('button');
        btnagregaralcarrito.classList.add('btn-agregar-al-carrito');

        /* Agregando Contenido */
        img.src = e.img;
        titulo.textContent = e.titulo;
        precio.innerText = `$${e.precio}`;
        marca.innerText = e.marca;
        btnagregaralcarrito.innerText = 'Agregar al carrito';

        btnagregaralcarrito.onclick = () => AgregarAlCarrito(e.id);

        stock.textContent = 'Sín Stock';

        /* Agregados a Html */
        container.appendChild(img);
        container.appendChild(titulo);
        container.appendChild(precio);
        container.appendChild(marca);

        if (e.sinstock) {
            container.appendChild(stock);
        } else {
            container.appendChild(btnagregaralcarrito);
        }

        productoscontainer.appendChild(container);
    });
}

/* Mostrar productos */
MostrarProductos(remeras);
MostrarProductos(shorts);
MostrarProductos(pantalones);
MostrarProductos(bikinis);


/* Filtros Categorias Funcionamiento */
const remerascategoria = document.getElementById('remeras');
const shortscategoria = document.getElementById('shorts');
const pantalonescategoria = document.getElementById('pantalones');
const bikiniscategoria = document.getElementById('bikinis');


remerascategoria.addEventListener('click', () => {
    if (remerascategoria.classList.contains('selected')) {
        remerascategoria.classList.remove('selected');
        QuitarProductos()
        MostrarProductos(remeras)
        MostrarProductos(shorts)
        MostrarProductos(pantalones)
        MostrarProductos(bikinis)
    } else {
        remerascategoria.classList.add('selected');
        QuitarProductos()
        MostrarProductos(remeras)
    }
});
shortscategoria.addEventListener('click', () => {
    if (shortscategoria.classList.contains('selected')) {
        shortscategoria.classList.remove('selected');
        QuitarProductos()
        MostrarProductos(remeras)
        MostrarProductos(shorts)
        MostrarProductos(pantalones)
        MostrarProductos(bikinis)
    } else {
        shortscategoria.classList.add('selected');
        QuitarProductos()
        MostrarProductos(shorts)
    }
});
pantalonescategoria.addEventListener('click', () => {
    if (pantalonescategoria.classList.contains('selected')) {
        pantalonescategoria.classList.remove('selected');
        QuitarProductos()
        MostrarProductos(remeras)
        MostrarProductos(shorts)
        MostrarProductos(pantalones)
        MostrarProductos(bikinis)
    } else {
        pantalonescategoria.classList.add('selected');
        QuitarProductos()
        MostrarProductos(pantalones)
    }
});
bikiniscategoria.addEventListener('click', () => {
    if (bikiniscategoria.classList.contains('selected')) {
        bikiniscategoria.classList.remove('selected');
        QuitarProductos()
        MostrarProductos(remeras)
        MostrarProductos(shorts)
        MostrarProductos(pantalones)
        MostrarProductos(bikinis)
    } else {
        bikiniscategoria.classList.add('selected');
        QuitarProductos()
        MostrarProductos(bikinis)
    }
});


/* Filtro Categoría Show/Hide */
const containerfiltrocategorias = document.querySelector('.filtro-por-categoria-container');
const filtrocategorias = document.querySelector('.categorias-filtro-h3');

let categoriaabierta = true

filtrocategorias.addEventListener('click', () => {
    if (categoriaabierta) {
        containerfiltrocategorias.classList.add('mostrar-filtro-categoria')
        remerascategoria.classList.add('mostrar-opciones-categoria')
        shortscategoria.classList.add('mostrar-opciones-categoria')
        pantalonescategoria.classList.add('mostrar-opciones-categoria')
        bikiniscategoria.classList.add('mostrar-opciones-categoria')
        categoriaabierta = false
    } else {
        containerfiltrocategorias.classList.remove('mostrar-filtro-categoria')
        remerascategoria.classList.remove('mostrar-opciones-categoria')
        shortscategoria.classList.remove('mostrar-opciones-categoria')
        pantalonescategoria.classList.remove('mostrar-opciones-categoria')
        bikiniscategoria.classList.remove('mostrar-opciones-categoria')
        categoriaabierta = true
    }
})


/* Local Storage P. Carrito */

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function AgregarAlCarrito(productoId) {
    let producto;

    [remeras, shorts, pantalones, bikinis].forEach((categoria) => {
        const prodencontrado = categoria.find((item) => item.id === productoId);
        if (prodencontrado) {
            producto = prodencontrado;
        }
    });

    if (producto) {
        const existeEnCarrito = carrito.some((item) => item.id === productoId);

        if (existeEnCarrito) {
            console.log("El producto ya está en el carrito");
        } else {
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            carritoalmacenadolocalstorage = carrito;

            ActualizarNumeroDeProductos();
        }
    } else {
        console.log("Producto no encontrado");
    }
}


