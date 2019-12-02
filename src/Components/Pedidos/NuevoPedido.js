import React, { Component,Fragment } from 'react';
import {Query} from 'react-apollo'
import DatosCliente from './DatosCliente';
import { OBTENER_PRODUCTOS } from '../../queries';
import '../../spiner.css';
import ContenidoPedido from './ContenidoPedido'
import {withRouter} from 'react-router-dom'

class NuevoPedido extends Component {
    state = {

    }
    render() {
        //este es el id del cliente
        const { id } = this.props.match.params;
        // console.log(this.props.session) 
        //este es el id del vendedor 
        const idVendedor = this.props.session.obtenerUsuario.id;

        return (
           <Fragment>
               <h1 className="text-center mb-5"> nuevo pedido </h1>
               <div className="row">
                   <div className="col-md-3">
                        <DatosCliente
                            id={id}
                        />
                   </div>
                   <div className="col-md-9" >
                        <Query query={OBTENER_PRODUCTOS} variables={{stock:true}}>
                            {({loading, error, data, }) => {
                                if (loading) return (
                                    <div className="spinner">
                                    <div className="rect1"></div>
                                    <div className="rect2"></div>
                                    <div className="rect3"></div>
                                    <div className="rect4"></div>
                                    <div className="rect5"></div>
                                    </div>
                                )
                                if (error) return `Error: ${error.message}`;
                                // console.log(data);
                                return (
                                    <ContenidoPedido
                                        productos= {data.obtenerProductos}
                                        id={id}
                                        idVendedor={idVendedor}
                                    />
                                )
                            }}
                        </Query>
                   </div>
               </div>
           </Fragment>
        );
    }
}
// cada que tengas un erros de history o params es mejor pasar withrouter
export default withRouter (NuevoPedido);