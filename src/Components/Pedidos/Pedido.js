import React from 'react';
import {OBTENER_PRODUCTO} from '../../queries';
import {Query, Mutation} from 'react-apollo';
import {ACTUALIZAR_ESTADO} from '../../mutations'

import ResumenProducto from './ResumenProducto'
import '../../pedidos.css';

const Pedido = (props) => {
    const {pedido} = props;
    // console.log(props);
    // console.log(pedido);
    const  {id } = pedido;
    // console.log(id);

    // console.log(Number (pedido.fecha) );
    const fecha = new Date (Number (pedido.fecha));
   // estado y clases de estado 
    const {estado} = pedido
    console.log(estado);

    let clase;
    if(estado === 'PENDIENTE'){
        clase = 'border-light';
    } else if ( estado === 'CANCELADO'){
        clase ='border-danger';
    } else {
        clase='border-success'
    }
    
    return (
        <div className="col-md-4">
            <div className={`card mb-3 ${clase}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                            <Mutation mutation={ACTUALIZAR_ESTADO} >
                                {actualizarEstado => (
                                    <select 
                                        className="form-control my-3"
                                        value={pedido.estado}
                                        onChange={e => {
                                        console.log(e.target.value);
                                        
                                        const input = {
                                            id,
                                            pedido: pedido.pedido,
                                            fecha: pedido.fecha,
                                            total: pedido.total,
                                            cliente: props.cliente,
                                            estado : e.target.value
                                        }

                                        // console.log(input);
                                        actualizarEstado({
                                            variables:{input}
                                        })
                                        
                                        }}
                                    >
                                        <option value="PENDIENTE">PENDIENTE</option>
                                        <option value="COMPLETADO">COMPLETADO</option>
                                        <option value="CANCELADO">CANCELADO</option>
                                    </select>
                                )}
                            </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal">{pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal">{fecha.toLocaleString("es-MX")}</span>
                    </p>

                    <h3 className="resaltar-texto card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map((producto,index) =>  {
                        // console.log(producto);
                        const {id} = producto;
                        return(
                            <Query query={OBTENER_PRODUCTO} key={ pedido.id + index } variables={{id}}>
                                {({loading,error, data}) => {
                                    if (loading) return 'cargando...'
                                    if (error) return  `Error: ${error.mesage}`
                                    // console.log(data);
                                    return(
                                        <ResumenProducto
                                            producto={data.obtenerProducto}
                                            cantidad={producto.cantidad}
                                            key={producto.id}
                                        />
                                    )
                                }}
                            </Query>
                        )
                    })}
                    <div className="d-flex align-items-center"> 
                        <p className="card-text resaltar-texto mr-1 bg-amarillo">Total: </p>
                        <p className="font-weight-normal inc-texto"> {pedido.total} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pedido