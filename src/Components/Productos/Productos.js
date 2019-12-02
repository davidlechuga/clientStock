import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import {OBTENER_PRODUCTOS} from '../../queries';
import {ELIMINAR_PRODUCTO} from '../../mutations';
import Exito from '../Alertas/Exito'
import Paginador from '../Paginador';

 
class Productos extends Component {
    // crear una nueva propiedad a Clientes 
    limite = 2; 

    state = { 
        alerta: {
            mostrar: false,
            mensaje: ''
        },

        paginador : {
            offset: 0,
            actual: 1
            }
    }

    paginaAnterior = () => {
        this.setState({
        paginador: {
        offset: this.state.paginador.offset - this.limite,
        actual: this.state.paginador.actual - 1
        }
        })
    }

    paginaSiguiente = () => {
        this.setState({
        paginador: {
        offset: this.state.paginador.offset + this.limite,
        actual: this.state.paginador.actual + 1
         }
        })
    }



    render() {

        const {alerta: {mostrar,mensaje} } = this.state;
        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

        return (
            <Fragment>
                <h1 className="text-center mb-5">Productos</h1>
                {alerta}

                <Query query={OBTENER_PRODUCTOS}  pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
                    {({loading, error, data, startPolling, stopPolling }) => {
                        if (loading) return "cargando ..."
                        if (error) return `Error: ${error.message}`;
                        console.log(data.obtenerProductos);

                        return(
                        <Fragment>
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">  NOMBRE </th>
                                        <th scope="col">  PRECIO </th>
                                        <th scope="col">  EXISTENCIA </th>
                                        <th scope="col">  ELIMINAR </th>
                                        <th scope="col">  EDITAR </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.obtenerProductos.map(item => {
                                        const {id} = item;
                                        // console.log(item);
                                        const { stock } = item;
                                        let clase;

                                        if(stock < 50) {
                                            clase = 'text-light table-danger'
                                        } else if (stock > 51 && stock < 100) {
                                            clase= 'table-warning'
                                        }
                                        
                                        return (
                                        //ponemos llaves para extraer (variables) el id y por ende como no fue un return, seguido se lo especificamos.
                                            <tr key={id} className={clase}>
                                                <td> {item.nombre}</td> 
                                                <td>{item.precio} </td> 
                                                <td> {item.stock} </td>
                                                <td>
                                                    <Mutation 
                                                        mutation={ELIMINAR_PRODUCTO}
                                                        //el data de onclompleted viene de resolver y schema (clase100)
                                                        onCompleted={(data) => {
                                                            // console.log(data);
                                                            this.setState({
                                                                alerta: {
                                                                    mostrar: true,
                                                                    mensaje: data.eliminarProducto
                                                                }
                                                            }, () => {
                                                                setTimeout (() => {
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar:false,
                                                                            mensaje: ''
                                                                        }
                                                                    })
                                                                }, 3000 )
                                                            })
                                                        }}
                                                    >
                                                        {eliminarProducto => (
                                                             <button
                                                             onClick= { () => {
                                                                 if (window.confirm('seguro deseas eliminar este producto')) {
                                                                    eliminarProducto({
                                                                        variables: {id}
                                                                    })
                                                                 }
                                                             }}
                                                             type="button"
                                                             className="btn btn-danger"

                                                             >&times; Eliminar
     
                                                            </button>
                                                        )}
                                                    </Mutation>
                                                </td>
                                                <td>
                                                    <Link to={`/productos/editar/${id}`} className="btn btn-success">
                                                        Editar Producto
                                                    </Link>
                                                </td> 
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                             <Paginador 
                             // 1) conutdocument (resolvers)
                             // 2) tipo de dato shcema.gql 3) que los traigan los querys declarando nuestra funcion objeto de resolver(totalClientes)
                             // 3) crear componente PAGINADOR  con estado para pasarle DATOS DEL PADRE(Clientes) al HIJO (Paginador).
                              //4) UNOS DATOS SE PASAN DESDE EL ESTADO(this) Y EL SEGUNDO POR PROPS.
                             actual={this.state.paginador.actual}
                             total= {data.totalProductos}
                             limite={this.limite}
                             paginaAnterior={this.paginaAnterior}
                             paginaSiguiente={this.paginaSiguiente}
                           />
                        </Fragment>    
                        )
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default Productos;