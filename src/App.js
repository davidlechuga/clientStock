import React,{Fragment} from 'react';

//  ROUTE ENLACES 
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';


//IMPORTAR COMPONENTES
import Header from './Components/Layout/Header'
//Clientes
import Clientes from './Components/Clientes/Clientes'
import NuevoCliente from './Components/Clientes/NuevoCliente'
import EditarCliente from './Components/Clientes/EditarCliente'
//Productos
import NuevoProducto from './Components/Productos/NuevoProducto';
import Productos from './Components/Productos/Productos';
import EditarProducto from './Components/Productos/EditarProducto';

//Pedidos
import NuevoPedido from './Components/Pedidos/NuevoPedido'
import PedidosCliente from './Components/Pedidos/PedidosCliente'
// GRAFICAS 
import Panel from './Components/Panel/Panel';
//REGISTROS 
import Registro from './Components/Auth/Registro';
//LOGIN
import Login from './Components/Auth/Login';
// Hig order component
import Session from './Components/Session';


const App = ({ refetch, session }) => {

  // console.log(session);
  

  const { obtenerUsuario } = session;

  const mensaje =  (obtenerUsuario) ? `Bienvenido ${obtenerUsuario.nombre}` : <Redirect to="/login" />; 

  return(
    //Provider RODEA NUESTROS COMPONENTES PARA UTILIZAR CARACTERISTICAS DE APOLLO ( querrys , mutations)
     <Router>
        <Fragment>
          <Header session= { session } />
            <div className="container">
              <p className=" text-right"> { mensaje } </p>
              <Switch>
                  <Route exact path="/clientes" render={() => <Clientes session={session} /> } />
                  <Route exact path="/clientes/editar/:id/" component={EditarCliente} />
                  <Route exact path="/clientes/nuevo" render={() => <NuevoCliente session={session} /> } />
                  <Route exact path="/productos/nuevo" component={NuevoProducto} />
                  <Route exact path="/productos/editar/:id" component={EditarProducto} />
                  <Route exact path="/productos" component={Productos} />
                  <Route exact path="/pedidos/nuevo/:id"  render={() => <NuevoPedido session={session} />} />
                  <Route exact path="/pedidos/:id" component={PedidosCliente} />
                  <Route exact path="/panel" component={Panel} />
                  <Route exact path="/registro" render={() => <Registro session={session} />} />
                  <Route exact path="/login" render={() => <Login refetch={refetch} />} />
              </Switch>
            </div>
        </Fragment>
     </Router>

  );
}

const RootSession = Session(App);

export {RootSession}