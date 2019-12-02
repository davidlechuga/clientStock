import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// exportarlo como objeto (asegurese)
import {RootSession} from './App';
//configuracion del cliente
import ApolloClient, { InMemoryCache }  from 'apollo-boost';
//react sepa que usaremos apollo
import {ApolloProvider} from 'react-apollo';

import * as serviceWorker from './serviceWorker';


// crear un ApolloClient 
const client = new ApolloClient ({
    // De donde sacara los datos de Graphql
    uri: "http://localhost:4002/graphql",
    //Enviar Token al Servidor.
    fetchOptions: {
      credentials: 'include'
    },
    request: operation => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization : token
        }
      })
    },
    //configuracion de apollo (datos en editar cliente que se quedan guardados)
    cache: new InMemoryCache({
      addTypename:false
    }),

    onError: ({ networkError, graphQLErrors}) => {
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkError', networkError);
      }
});




ReactDOM.render(
    <ApolloProvider client={client} > 

        <RootSession />

    </ApolloProvider>,

      document.getElementById('root')

    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
