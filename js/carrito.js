const calcularProductos = producto => {
    try
    {
        let cantidad = 0;
        const data = JSON.parse(localStorage.getItem('products'));
        data.productos.forEach(element => {
            if(element.nombre===producto)
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
        console.log('ERROR: ',response);
    }
};

try
{
    const data = JSON.parse(localStorage.getItem('products'));
    
    if(typeof data === 'object')
    {
        let tableContent = `
        <tr>
            <th style="border-bottom-style:solid;border-color:white;border-width: 1px;color:white">Producto</th>
            <th style="border-bottom-style:solid;border-color:white;border-width: 1px;color:white">Cantidad</th>
            <th style="border-bottom-style:solid;border-color:white;border-width: 1px;color:white">Precio por producto</th>
            <th style="border-bottom-style:solid;border-color:white;border-width: 1px;color:white">Subtotal</th>
        </tr>
        `;

        let subtotal = 0;

        data.productos.forEach(producto => {
            const cantidad = calcularProductos(producto.nombre);
            tableContent += `
            <tr>
                <td style="color:white;">${producto.nombre}</td>
                <td style="color:white;">${1}</td>
                <td style="color:white;">$${producto.precio}</td>
                <td style="color:white;">$${producto.precio}</td>
            <tr>
            `;
            subtotal += producto.precio;
        });

        const iva = subtotal * 0.16;
        const total = subtotal + iva;

        tableContent += `
        <tr>
            <th style="border-bottom-style:solid;border-color:white;border-width: 1px;color:white">Subtotal</th>
            <th style="border-bottom-style:solid;border-color:white;border-width: 1px;color:white">IVA</th>
            <th style="border-bottom-style:solid;border-color:white;border-width: 1px;color:white">Total</th>
        </tr>
        <tr>
            <td style="color:white;">$${subtotal}</td>
            <td style="color:white;">$${iva}</td>
            <td style="color:white;">$${total}</td>
        </tr>
        `;
        document.getElementById('tablaCarrito').innerHTML = tableContent ;
        document.getElementById('btnComprar').addEventListener('click',() => {
            try
            {
                const dialog = confirm(`¿Está seguro de finalizar la compra?\nEl total a pagar es: ${total}`);
                console.log('INFO: ',{
                    event: 'Compra finalizada',
                    dialog
                });
                if(dialog)
                {
                    window.location.href = '../promociones.html';
                }
            }
            catch(err)
            {
                const res = {
                    event: 'Error en confirm',
                    error: err,
                    msg: 'Error al finalizar la compra'
                };
                console.log('ERROR: ',res);
            }
        });
    }
    else
    {
        const response = {
            event: 'Error al recibir info del localstorage',
            msg: 'El dato recibido no es un objeto'
        };
        console.log('INFO: ',response);
    }
}
catch(ex)
{
    const response = {
        event: 'Error en carrito',
        msg: 'Ocurrió un error al obtener el carrito del LocalStorage',
        error: ex
    };
    console.log('ERROR: ',response);
}

document.getElementById('btnCancelar').addEventListener('click',() => {
    try
    {
        window.location.href = '../promociones.html';
    }
    catch(ex)
    {
        const response = {
            event: 'Error en botón cancelar',
            msg: 'Ocurrió un error al navegar a promociones.html',
            error: ex
        };
        console.log('ERROR: ',response);
    }
});