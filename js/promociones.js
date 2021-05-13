
const carrito = {
    productos: [],
    subtotal: 0,
    total: 0,
    iva: 16

};

const addProduct = (product) => {
    carrito.productos.push(product);
    localStorage.setItem('products', JSON.stringify(carrito));
    // console.log(JSON.parse(localStorage.getItem('products')));
    calcularTotales();
    sumarCarrito();
    showSnackbar(`Se ha agregado el producto "${product.nombre}" con éxito`);
}

const calcularTotales = () => {
    let total = 0;
    for (const producto of carrito.productos) {
        total+=producto.precio
    }
    carrito.total = total;
    console.log(carrito);
}

const showSnackbar = (text) => {
    const x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

const sumarCarrito = () => {
    const carritoDIV = document.getElementById("contador");
    carritoDIV.innerHTML = `${carrito.productos.length}`
}

const setCantidad = (cont) => {
    cont.innerHTML = 3
}




