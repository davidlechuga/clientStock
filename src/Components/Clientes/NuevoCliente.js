import React,{Component,Fragment} from 'react';
// AL IGUAL QUE CON LOS QUERYES , LOS MUTATIONS SE EXPORTAN USARLOS.
import {NUEVO_CLIENTE} from '../../mutations';
import {Mutation} from 'react-apollo';
import { withRouter} from 'react-router-dom';
class NuevoCliente extends Component {
    state={ 
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            email: '',
            tipo: ''
        },
        error: false, 
        emails: []
    }

    //METODO (arrow function ) de evento OnChange leerCampo
    // si edito el 0(i) y el campo es diferente index
    // DE CASO CONTRARIO AGRAGA EN EL STATE LO QUE SE ESTA ESCRIBIENDO
    leerCampo = i => e => {
        const nuevoEmail = this.state.emails.map((email,index) => {
            if ( i !== index ) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({
            emails: nuevoEmail
        })
    }

    // Metodo (arrow function) del EVENTO ONCLICK PARA AGREGAR EMAILS
    // agregamos en el state el arreglo de emails
    //declaramos cambio de estado, 
    // y actualizamos el estado del boton al click  concatenando el arreglo de emails , al estado email(objeto).
    nuevoCampo = ()  => {
        this.setState({
            emails: this.state.emails.concat([{}])
        });
    }

    // Metodo ( dos arrow functions por la propagación del evento ) del evento Onclick para ELIMINAR EMAILS.+
    // el METODO FILTER  recibe dos parametros VALORES DEL ARREGLO Y EL INDICE.
    //  esto va a retornar todos los emails   que no sean igual al INDEX
    quitarCampo = i => () => {
        this.setState({
            emails: this.state.emails.filter((emails,index) => i !== index)
        })
    }
    // UTILIZAREMOS ONCHANGE EN TODOS LOS INPUTS 
    // Al LLENAR TODOS LOS CAMPOS REQUERIDOS por input ClienteInput del Schema.graphql, 
    // ESTAMOS ENVIADO UN OBJETO POR LO QUE NUESTRO MUTATION(llamado input) ESTARA DECLARADO(26) y rodeando todo el FORM (apollo props).
    // una vez declarado el MUTATION de graql en codigo hay que declarar la función del MUTATION crearCliente , rodenado el form.
    // declarada la función la usamos pasandole variables (props apollo) y el objeto (el input)
        render(){
            //DECLARAMOS ERRORES EN EL ESTADO DE LOS INPUTS MEDIANTE UN TERNARIO Y USAMOS RESPUESTA MEDIANTE DESTRUCTURING
            const {error} = this.state;
            const respuesta = (error) ? <p className="alert alert-danger p-3 text-center"> Todos los Campos Son Obligatorios</p> : '';
            return(
                <Fragment>
                <h2 className="text-center"> Nuevo Cliente </h2>
                    {respuesta}
                <div className="row justify-content-center">
                    <Mutation 
                    //Creamos arrow function que nos lleve a la pag. principal una VEZ SE HAGA EL MUTATION (apollo CALLBACK).
                        mutation={NUEVO_CLIENTE}
                        onCompleted={ () => 
                            this.props.history.push('/clientes')
                        }
                    >
                        { crearCliente => ( 
                <form 
                    className="col-md-8 m-3" 
                    onSubmit={e => {
                        //no envie form , haya variaciones.
                        e.preventDefault();
                        // aplicar un destructuring del Estado de este (this) COMPONENTE.
                        const {nombre,apellido,empresa,edad,tipo} = this.state.cliente;
                        // DESTRUCTURING DEL ARREGLO EMAILS , YA HECHO 4 CAMBIOS EN SERVIDOR (DB /SCHEMA.gql)
                        const {emails} = this.state;
                        // la condicion es para los inputs, si es requerido el dato y no esta el estado  error:true  /  sino error:false
                        if (nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === '' ){
                            this.setState({
                                error:true
                            });
                            return;
                        }

                        this.setState({
                            error:false
                        })
                        
                        const input = { 
                            nombre,
                            apellido,
                            empresa,
                            edad: Number(edad),
                            tipo,
                            emails,
                 
                        };
                        crearCliente({
                            variables: {input}
                        })
                    }}
                >
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre"
                                    onChange={e => {
                                        this.setState({
                                            cliente:{
                                                ...this.state.cliente,
                                                nombre: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    onChange={e => {
                                        this.setState({
                                            cliente:{
                                                ...this.state.cliente,
                                                apellido: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Empresa</label>
                                    <input
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Empresa"
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    empresa: e.target.value
                                                }
                                            })
                                        }}
                                    />
                            </div>
                            {this.state.emails.map((input,index)=> (
                                //USAMOS JAVASCRIPTA (destructuring) para iterar nuestro estado de emails,
                                // que es actualizado mediante el EVENTO onClick y concatenado al estado mediante UN METODO
                                // LA KEY ES NESESARIA PARA REACT PARA MANEGAR ARREGLOS
                                <div key={index} className=" form-group col-md-12"> 
                                    <label> Correo: {index + 1} </label>
                                <div className="input-group">
                                <input 
                                    //para leer en que campo de email escribes parametro (index) y el evento 
                                    onChange={this.leerCampo(index)}
                                    type="email" 
                                    placeholder="email" 
                                    className="form-control"
                                />
                                <div className="input-group-append">
                                    <button
                                        onClick={this.quitarCampo(index)}
                                        type="button"
                                        className="btn btn-danger"
                                    >&times; Eliminar </button>
                                </div>
                                </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button 
                                    //PRIMERO SE AGREGA EL EVENTO AL ELEMENTO, SEGUNDO SE LE AGREGA UN ESTADO , TERCERO HACES UN METODO (FUNCION), CUARTO ITERAS ACTULIZACION DEL ESTADO.
                                    onClick={this.nuevoCampo}
                                    type="submit"
                                    className="btn btn-warning"
                                > 
                                +Agregar Email
                                </button>
                            </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Edad"
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    edad: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>  
                                <select 
                                    onChange={e => {
                                        this.setState({
                                            cliente:{
                                                ...this.state.cliente,
                                                tipo: e.target.value
                                            }
                                        })
                                    }}
                                    className="form-control">    
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                            </div>
                        <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                </form>
                )}
                </Mutation>
                </div>
                </Fragment>
        );
    }
}

export default withRouter (NuevoCliente)