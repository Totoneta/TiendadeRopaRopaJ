/* Navbar */

let carritonumerocantidadproductos = document.querySelector('.numero-de-carrito');
const carritoalmacenadolocalstorage = JSON.parse(localStorage.getItem('carrito')) || [];
carritonumerocantidadproductos.innerText = carritoalmacenadolocalstorage.length

/* FIN Navbar */