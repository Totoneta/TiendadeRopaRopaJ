document.addEventListener('DOMContentLoaded', function () {
    /* Navbar */

    let carritonumerocantidadproductos = document.querySelector('.numero-de-carrito');
    let carritoalmacenadolocalstorage = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para actualizar el número de productos en el carrito
    function ActualizarNumeroDeProductos() {
        if (carritonumerocantidadproductos) {
            carritonumerocantidadproductos.innerText = carritoalmacenadolocalstorage.length;
        }
    }

    /* FIN Navbar */

    /* Precio Total De Compra */
    const preciototalcompra = document.getElementById('total-carrito-compra');

    function ActualizarPrecioTotal(carrito) {
        let total = 0;
        carrito.forEach((e) => {
            total += e.precio;
            preciototalcompra.innerText = `${total}`
        })
    }

    /* Función para mostrar los productos en el carrito */
    function MostrarCarrito(carrito) {
        const carritolista = document.querySelector('.carrito-list');

        if (!carritolista) return

        carritolista.innerHTML = '';

        carrito.forEach((e) => {
            let container = document.createElement('li');
            container.classList.add('container-producto-carrito');

            let img = document.createElement('img');
            let titulo = document.createElement('h3');
            let precio = document.createElement('span');
            let marca = document.createElement('p');

            let containertexto = document.createElement('div');
            containertexto.classList.add('container-texto-carrito');

            let btneliminardecarrito = document.createElement('button');
            btneliminardecarrito.classList.add('btn-eliminar-del-carrito');
            btneliminardecarrito.innerText = 'Eliminar';

            btneliminardecarrito.onclick = () => EliminarDelCarrito(e.id);

            img.src = e.img || 'ruta/de/imagen/por/defecto.jpg';
            titulo.textContent = e.titulo || 'Sin título';
            precio.innerText = `$${e.precio || '0'}`;
            marca.innerText = e.marca || 'Desconocida';

            containertexto.appendChild(titulo);
            containertexto.appendChild(precio);
            containertexto.appendChild(marca);

            container.appendChild(img);
            container.appendChild(containertexto);
            container.appendChild(btneliminardecarrito);

            carritolista.appendChild(container);
        });
    }

    // Eliminar Producto en Carrito
    function EliminarDelCarrito(productoId) {
        let carritoActualizado = carritoalmacenadolocalstorage.filter((producto) => producto.id !== productoId);
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

        carritoalmacenadolocalstorage.length = 0;
        carritoalmacenadolocalstorage.push(...carritoActualizado);

        MostrarCarrito(carritoActualizado);
        ActualizarNumeroDeProductos();
        ActualizarPrecioTotal(carritoalmacenadolocalstorage)
    }



    // Vaciar Carrito
    let vaciarcarritobtn = document.getElementById('vaciar-carrito');

    function VaciarCarrito() {
        localStorage.removeItem('carrito');

        carritoalmacenadolocalstorage.length = 0;

        ActualizarNumeroDeProductos();
        MostrarCarrito(carritoalmacenadolocalstorage);
        ActualizarPrecioTotal(carritoalmacenadolocalstorage)
    }

    vaciarcarritobtn.addEventListener('click', VaciarCarrito);

    /* Activaciones Al Refrescar */
    ActualizarNumeroDeProductos();
    MostrarCarrito(carritoalmacenadolocalstorage);
    ActualizarPrecioTotal(carritoalmacenadolocalstorage);


    /* Comprar Btn */
    const btnpagar = document.querySelector('.comprar-btn-carrito');
    const btnvaciarcarrito = document.getElementById('vaciar-carrito');

    if (carritoalmacenadolocalstorage.length < 1) {
        btnpagar.classList.add('inhabilitado')
        btnvaciarcarrito.classList.add('inhabilitado')
    };




})