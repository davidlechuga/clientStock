import React, { Component, Fragment } from 'react';
import {Mutation} from 'react-apollo';
import {NUEVO_USUARIO} from '../../mutations';
import Error from '../Alertas/Error';

import {withRouter, Redirect} from 'react-router-dom';

const initialState = { 
    usuario: '',
    password: '',
    repetirPassword: '',
    nombre: '',
    rol: ''
}


class Registro extends Component {
    state = {
        ...initialState
     }

     actualizarState = (e) => {
        // console.log('escribiendo....');
        const {name, value} = e.target;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name] : value
        });
    }
    
    validarForm = () => {
        const {usuario, password, repetirPassword, nombre, rol } = this.state;
    
        const noValido = !usuario || !password || !nombre || !rol || password !== repetirPassword;
    
        // console.log(noValido);
        return noValido;
    }

    crearRegistro = (e, crearUsuario) => {
        e.preventDefault();
        console.log('creando registor');

        crearUsuario().then(data => {
            console.log(data);
            this.limpiarState();
            this.props.history.push('/login');
        })
    }
    // reiniciar el state de nuestro formulario
    limpiarState = () => {
        this.setState({...initialState})
    }

    render() {
        //video  176 explicacion.
        const  { usuario, password, repetirPassword, nombre, rol } = this.state;
        // console.log(this.props.session);
        const rolUsuario = this.props.session.obtenerUsuario.rol;
        const redireccion = (rolUsuario !== 'ADMINISTRADOR' ) ?  <Redirect to="/clientes" /> : '';
        return (
            <Fragment>
                {redireccion}
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                    <div className="row  justify-content-center">
                        <Mutation 
                            mutation={NUEVO_USUARIO}
                            variables={{usuario, password, nombre, rol}}
                        >
                            {(crearUsuario, { loading, error, data })=> {
                                return (
                                    <form 
                                        className="col-md-8"
                                        onSubmit={ e => this.crearRegistro(e, crearUsuario)}
                                    >
                                        {error && <Error error={error}> </Error>}
                                    <div className="form-group">
                                        <label>Usuario</label>
                                        <input 
                                            onChange={this.actualizarState}
                                            type="text" 
                                            name="usuario" 
                                            className="form-control" 
                                            placeholder="Nombre Usuario" 
                                            value={usuario}
                                        />
                                        <small className="form-text text-muted">
                                            (sin espacios y sin caracteres especiales)
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input 
                                            onChange={this.actualizarState}
                                            type="text" 
                                            name="nombre" 
                                            className="form-control" 
                                            placeholder="Nombre Completo" 
                                            value={nombre}
                                        />
                                        <small className="form-text text-muted">
                                            (Agrega el Nombre y Apellido Completo)
                                        </small>
                                    </div>

                                   <div className="form-row">
                                   <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input 
                                            onChange={this.actualizarState}
                                            type="password" 
                                            name="password" 
                                            className="form-control" 
                                            placeholder="Password"
                                            value={password}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Repetir Password</label>
                                        <input 
                                            onChange={this.actualizarState}
                                            type="password" 
                                            name="repetirPassword" 
                                            className="form-control" 
                                            placeholder="Repetir Password" 
                                            value={repetirPassword}
                                        />
                                    </div>
                                   </div>
                                   <div className="form-group">
                                       <label>Rol:</label>
                                        <select
                                            className="form-control"
                                            value={rol}
                                            name="rol"
                                            onChange={this.actualizarState}
                                        >
                                            <option value=""> Elegir...</option>
                                            <option value="ADMINISTRADOR"> ADMINISTRADOR</option>
                                            <option value="VENDEDOR"> VENDEDOR</option>
                                        </select>
                                   </div>

                                    <button 
                                        disabled={ loading || this.validarForm() }
                                        type="submit" 
                                        className="btn btn-success float-right">
                                            Crear Usuario
                                    </button>  
                                    </form>
                                )
                            }}
                        </Mutation>
                    </div>   
            </Fragment>    
        );
    }
}

export default withRouter (Registro);