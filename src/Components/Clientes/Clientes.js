import React, {Fragment, Component} from 'react';
// QUERY es para consultar base de datos
import {Query, Mutation} from 'react-apollo'; 
// importar los CLIENTES_QUERYS  y ELIMITAR MUTATION
import { CLIENTES_QUERY } from '../../queries';
import {Link} from 'react-router-dom';
import {ELIMINAR_CLIENTE} from '../../mutations';
//  importar componentes
import Exito from '../Alertas/Exito'
import Paginador from '../Paginador';

// ESTE ES UN STATELESS FUNCTIONAL COMPONENT (NO STATE), POR LO QUE PASA A SER A UN CLASS COMPONENT para tener state
// const Contactos = () => ()
class Clientes extends Component  {

  // crear una nueva propiedad a Clientes 
  limite = 5; 

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

  render(){
    //componente que se carga de forma condicional de acuerdo a lo que haya en el STATE.
    // Alerta en que sea exitoso
    const {alerta: {mostrar,mensaje} } = this.state;
    const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';
    //Obtiene el ID del vendedot para mostrar sus clientes
    // console.log(this.props.session.obtenerUsuario);
    let id;
    
    const { rol } = this.props.session.obtenerUsuario;
    if ( rol === 'VENDEDOR'){
      id = id = this.props.session.obtenerUsuario.id;
    } else {
      id = '';
    }
    // console.log(id);
    
    return(
       //PollIntrval refresca la pagina 1s (tipo socket.io) en react-apollo
       <Query query={CLIENTES_QUERY} pollInterval={1000} 
       variables={{
         limite: this.limite,
         offset: this.state.paginador.offset,
         vendedor: id }} >
       {({ loading, error, data, startPolling, stopPolling }) => {
         if (loading) {
           return (<div>Loading...</div>);
         }
         if (error) {
           console.error(error);
           return (`Error:${error.message}`);
         }
         //PARA VER ESTOS DATOS 1) RESOLVERS: CREAR FUNCION COUNTDOCUMENT 2) EL QUERY: DEL SHCHEMA.GQL CON OFFSET Y LIMITE 3) EN QUERY : DEL INDEX JS PONER totalClientes y atributos 4)  PAGINADOR PASAR NUMERO DE CLIENTES 
        //  console.log(data);
        //  console.log(data.getClientes);
         //   ITERAMOS los objetos encontrados en MONGODB ,  y extraidos por los QUERYS DE REACT APOLLO.
         //   REACT PIDE UNA KEY { .id}  CON EL ID DEL OBJETO ÚNICO.
         return ( 
           <Fragment>
               <h3 className="text-center mt-4">  Listado de Clientes </h3>
                  {alerta}
                   <ul className="list-group mt-4" > 
                        {data.getClientes.map(item => {
                          //LA LLAVES DESPUES DEL ARROW FUNCTION ES PARA DECLARAR CONSTANTES , PORQUE,
                          // UNA VEZ RETORNANDO LA FUNCIÓN NO SE PUEDEN DECLARAR.
                          const {id} = item;
                          return(
                               <li key={item.id} className="list-group-item">
                                   <div  className="row justify-content-between align-items-center">
                                       <div className="col-md-8 d-flex justify-content-between align-items-center"> 
                                           {item.nombre} {item.apellido} - {item.empresa} 
                                       </div>
                                       <div className="col-md-4 d-flex justify-content-end">
                                          <Link
                                            to={`/pedidos/nuevo/${id}`}
                                            className="btn btn-warning d-block d-md-inline-block mr-2"
                                          >
                                           &#43; Nuevo Pedido
                                          </Link>

                                          <Link
                                          //el id es el del cliente.
                                            to={`/pedidos/${id}`}
                                            className="btn btn-primary d-block d-md-inline-block mr-2"
                                          >
                                           &#43; Ver Pedidos
                                          </Link>    

                                         <Mutation mutation={ELIMINAR_CLIENTE}
                                             //el data de onclompleted viene de resolver y schema (clase100)
                                             onCompleted={(data) => {
                                              // console.log(data);
                                              this.setState({
                                                  alerta: {
                                                      mostrar: true,
                                                      mensaje: data.eliminarCliente
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
                                           {eliminarCliente  =>(
                                             // 1)usamos MUTATION / 2) LA FUNCION ELIMINARA MEDIANTE UN METODO CON PARAMETRO ID
                                             <button 
                                             type="button"
                                             className="btn btn-danger d-block d-md-inline-block mr-2"
                                             onClick={() => {
                                               //APARECE VENTANA DEL NAVEGADOR WINDOW.CONFIRM
                                               if(window.confirm('¿Seguro quiere eliminar este cliente?')){
                                                 eliminarCliente({
                                                   variables: {id}
                                                 })  
                                               }
                                               // console.log(item.id);
                                               eliminarCliente({
                                                 variables: {id}
                                               })               
                                             }}
                                             >
                                             &times; Eliminar
                                             </button>
                                           )}
                                         </Mutation>
                                         <Link 
                                         to ={`/clientes/editar/${item.id}`}
                                         className="btn btn-success d-block d-md-inline-block"
                                         >
                                         Editar cliente
                                         </Link>
                                       </div>
                                   </div>
                               </li>
                             )
                           })}
                       </ul>
                       <Paginador 
                          // 1) conutdocument (resolvers)
                          // 2) tipo de dato shcema.gql 3) que los traigan los querys declarando nuestra funcion objeto de resolver(totalClientes)
                          // 3) crear componente PAGINADOR  con estado para pasarle DATOS DEL PADRE(Clientes) al HIJO (Paginador). pasar el total
                           //4) UNOS DATOS SE PASAN DESDE EL ESTADO(this) Y EL SEGUNDO POR PROPS.
                          actual={this.state.paginador.actual}
                          total= {data.totalClientes}
                          limite={this.limite}
                          paginaAnterior={this.paginaAnterior}
                          paginaSiguiente={this.paginaSiguiente}
                        />
                   </Fragment>
                )
            }}
       </Query>    
    )
  }  
}
export default Clientes;
