import React from 'react'

import { ApolloConsumer} from 'react-apollo';
import {withRouter} from 'react-router-dom';

const cerrarSessionUsuario =  (cliente, history) => {
    localStorage.removeItem('token', '');
    //deslogear
    cliente.resetStore();
    //redireccionar
    history.push('/login');
}

const CerrarSession = ({history}) => (
    <ApolloConsumer>
        {cliente => {
            return(
                <button
                    onClick={() => cerrarSessionUsuario(cliente, history)}
                    className=" btn btn-light ml-md-2 mt-2 mt-md-0">cerrar Session 
                </button>
            );
        }}
    </ApolloConsumer>
)
export default withRouter (CerrarSession)