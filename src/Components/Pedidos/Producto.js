import React, { Component,Fragment } from 'react';

class  Producto extends Component {
    state= { }
    render() {
        //leyendo los props sin componentdidmount ...DESDE RESUMEN.js (video 115)
        const { producto } = this.props;

        return (
            <Fragment>
                <tr>
                    <td> {producto.nombre} </td>
                    <td> ${producto.precio} </td>
                    <td> {producto.stock}  </td>
                    <td> 
                        <input
                            min="1"
                            type="number"
                            className="form-control"
                            onChange={ e => {
                                if (e.target.value > producto.stock){
                                    e.target.value = 0;
                                }
                                this.props.actualizarCantidad(e.target.value, this.props.index)
                            }}
                        />
                    </td>
                    <td>
                        <button 
                            //la funcion eliminarProducto  elimina el producto con ese id del parametro que esta en los props de este componente.
                            onClick={ e => this.props.eliminarProducto(producto.id)}
                            className="btn btn-danger font-weight-bold"
                            type="button"> &times;
                                Eliminar
                        </button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Producto;