import React, { Component,Fragment } from 'react';
import {Query} from 'react-apollo'
import{OBTENER_PRODUCTO} from '../../queries'
import FormularioEditar from '../../Components/Productos/FormularioEditarProducto'

class EditarProducto extends Component {
    state = {}
    render() {
        const {id} = this.props.match.params;
        console.log(id);
        
        return (
            // <h1> {id} </h1>
            <Fragment>
                <h1 className=" text-center"> Editar producto </h1>
                <Query query= {OBTENER_PRODUCTO} variables={{id}} fetchPolicy= {'no-cache'}>
                    {({loading, error, data, refetch }) => {
                        if (loading) return 'cargando'
                        if (error) return `error: ${error.message}`;
                        // LO QUE HAYAMOS DEFINIDO EN EL SCHEMA Y RESOLVERS ESTARA AQUI EN DATA.
                        // console.log(data);
                        return(
                            <FormularioEditar 
                                producto={data}
                                id= {id}
                                refetch={refetch}
                            />
                        )
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default EditarProducto;