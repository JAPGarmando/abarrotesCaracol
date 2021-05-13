const calcularProductos = (carrito,producto) => {
    try
    {
        let cantidad = 0;
        carrito.forEach(element => {
            if(element===producto)
            {
                cantidad++;
            }
        });
        return cantidad;
    }
    catch(ex)
    {
        const response = {
            event: 'Error en calcularProductos',
            msg: 'Error al calcular cantidad de productos',
            error: ex
        };
        console.log('ERROR',response);
    }
};

try
{
    const data = JSON.parse(localStorage.getItem('products'));
    
    if(typeof data === 'object')
    {
        let tableContent = `
        <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio por producto</th>
            <th>Subtotal</th>
        </tr>
        `;
        data.productos.forEach(producto => {
            const cantidad = calcularProductos(data.productos,producto.nombre);
            tableContent += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${cantidad}</td>
                <td>${producto.precio}</td>
                <td>${cantidad*producto.precio}</td>
            <tr>
            `;
        });
        document.getElementById('tablaCarrito').innerHTML = tableContent ;
    }
    else
    {
        const response = {
            event: 'Error al recibir info del localstorage',
            msg: 'El dato recibido no es un objeto'
        };
        console.log('INFO',response);
    }
}
catch(ex)
{
    const response = {
        event: 'Error en carrito',
        msg: 'Ocurrió un error al obtener el carrito del LocalStorage',
        error: ex
    };
    console.log('ERROR',response);
}