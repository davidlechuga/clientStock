import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import {ACTUALIZAR_PRODUCTO} from '../../mutations';
//esto es un high order component y sirve para direccionar , porque con props.history no funciona.
import {withRouter} from 'react-router-dom';



const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class FormularioEditar extends Component {

    state = {
        ...this.props.producto.obtenerProducto
    }

    limpiarState = () => {
        this.setState({
            ...initialState
        })
    }
    //  el evento viene de los inputs.
    actualizarState = e => {
        const {name,value} = e.target;
   //  actualizara el extado del input y pondra lo que se escribe.
        this.setState({
            [name]: value
        })
    }
    // validarFORM no sera ningun evento por lo que solo es un arrow function.
    validarForm = () => {
    const {nombre, precio, stock} = this.state;
    const noValido = !nombre || !precio || !stock;
    //consol.log(noValido)
    return noValido
    }

    editarProductoForm = (e, actualzarProducto) => {
        e.preventDefault();
        actualzarProducto().then (data => {
            // console.log(data);
            this.setState({
                ...initialState
            })
            
        })  
    }

    render() {
        // ESTA ES LA LECTURA DEL STATE
        const {nombre, precio, stock} = this.state;
        const { id } = this.props;

        const input = {
            id,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }
        return (

            <Mutation 
                mutation={ACTUALIZAR_PRODUCTO} 
                variables={{input}} 
                key={id} 
                //video 104 explicaicon refetch para tener copia fresca de los datos una vez editados.
                onCompleted={() => this.props.refetch().then(() => {
                this.props.history.push('/productos')
                })}  
            > 
            {(actualzarProducto, {loading, error , data }) => {
                return(
            <form 
                className="col-md-8"
                onSubmit= { e => this.editarProductoForm (e, actualzarProducto )}
            >
                <div className="form-group">
                    <label>Nombre:</label>
                    <input 
                        onChange={this.actualizarState}
                        type="text"
                        name="nombre" 
                        className="form-control" 
                        placeholder="Nombre del Producto"
                        value={nombre}
                    />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input 
                            onChange={this.actualizarState}
                            type="number" 
                            name="precio" 
                            className="form-control" 
                            placeholder="Precio del Producto"
                            value={precio}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    <input 
                        onChange={this.actualizarState}
                        type="number" 
                        name="stock" 
                        className="form-control" 
                        placeholder="stock del Producto" 
                        value={stock}
                    />
                </div>
                <button 
                    disabled={ this.validarForm() }
                    type="submit" 
                    className="btn btn-success float-right">
                            Guardar Cambios
                </button>
            </form>
              
              )
            }}
            </Mutation>
        );
    }
}

export default withRouter (FormularioEditar);