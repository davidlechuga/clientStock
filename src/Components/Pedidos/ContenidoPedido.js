import React, { Component, Fragment } from 'react';
import Select from 'react-select'
import Animated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido'
import Error from '../Alertas/Error'

class ContenidoPedido extends Component {

    state = { 
        productos: [],
        total: 0
    };

    seleccionarProducto= (productos) => {
        // depasarece el objet y nos muestra le arreglo de objetoss
        // console.log(`algo paso con ` , {productos});
        // COMENZAMOS CON UN STATE VACIO , PERO CAMBIAMOS EL STATE SEGUN EL EVENTO DEL INPUT
        this.setState({
            productos
        })
    };

    actualizarTotal = () => {
        //leer el state de productos
        const productos = this.state.productos;
        // cuando todos los productos estan en cero
         if (productos.length === 0 ) {
            this.setState ({
                total: 0
            });
        //return para no se siga ejecutando la funcion
            return;
        }
        let nuevoTotal = 0;
        // Realizar operaciones cantidad por precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));
        this.setState({
            total: nuevoTotal
        })  
    };

        // esta comiunicado con el archivo Producto.js / reusmen.js / ny neuvopedido.js/ esta funcion
    actualizarCantidad=(cantidad, index) => {
        //leyendo el state actual
        const productos = this.state.productos;
        //agregar la cantidad desde la interfaz , en base a la cantidad que estemos actualizando en el index  paramos la cantidad.
        productos[index].cantidad = Number(cantidad);
        // console.log(productos);
        // console.log(cantidad);
        // console.log(index);      
        this.setState({
            productos
        }, () => {
            // una vez acutalizada la cantidad , queremos actualizar el total $
            this.actualizarTotal();
        })   
    };
    // este metodo se propaga de este componentes (PADRE) hasta Productos.js, pasando por Resumen.js.  y se pasan el id mediante props.
    eliminarProducto = (id) => {
        // console.log(id);
        const productos = this.state.productos;

        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            // una vez aque elimino un producto , ejecuta actualizarTotal, reviza los productos que quedan en el state y actualiza total.
            this.actualizarTotal()
        })  
    };

    render() {
        const mensaje = (this.state.total < 0 ) ? <Error error="las cantidades no pueden ser negativas" /> : '';
        return (
            <Fragment>
                <h2 className="text-center mb-5"> Seleccionar Artículos </h2>
                {mensaje}
                <Select
                // que los porductos que selecciones se almacenen en el STATE
                    onChange={this.seleccionarProducto}
                    options={this.props.productos}
                    isMulti= {true}
                    components={Animated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos}
                />

                <Resumen
                    // aqui llama a los ojectos desde el state para almacenarlos en una variable.
                    productos={this.state.productos}
                    //aqui llama metodos de este comoponente con this.
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />

                <p className="font-weight-bold float-right mt-3">
                    Total:
                    <span className="font-weigth-normal">
                         $ {this.state.total}
                    </span>
                </p>

                <GenerarPedido
                    //pasando props el state y props paraa generar pedido
                    productos={this.state.productos}
                    total={this.state.total}
                    idCliente={this.props.id}
                    idVendedor={this.props.idVendedor}
                />


            </Fragment>
        );
    }
}

export default ContenidoPedido;