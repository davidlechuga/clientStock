import React from 'react';
import {Mutation} from 'react-apollo';
import {NUEVO_PEDIDO} from '../../mutations'
import {withRouter} from 'react-router-dom'


const validarPedido = (props) => {
    // validacion usando props.
    let noValido = !props.productos || props.total <= 0;

    return noValido;

}

const GenerarPedido = (props) => {
    // console.log(props);
    return (
        <Mutation mutation = {NUEVO_PEDIDO} onCompleted= { () => props.history.push('/clientes') } >
            {nuevoPedido => (
                <button
                    disabled={validarPedido(props)}
                    type="button"
                    className="btn btn-warning mt-4"
                    onClick={ e => {
                    const productosInput = props.productos.map(({nombre, precio, stock, ...objeto}) => objeto)
                    // console.log(productosInput);
                    const input = {
                        pedido: productosInput,
                        total: props.total,
                        cliente: props.idCliente,
                        vendedor: props.idVendedor
                    }
                    
                    // console.log(input);
                    // esta linea ejecuta la funcion del onclick con valores especificados.
                    nuevoPedido({
                        variables: {input}
                    })
                    
                    }}
                >
                Generar Pedido
                </button>  
            )}
        </Mutation> 
    );
    
}

export default withRouter (GenerarPedido);