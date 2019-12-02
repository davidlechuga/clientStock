import React, {Fragment} from 'react';
import Clientes from './Clientes'
import Vendedores from './Vendedores'

const Panel = () => {
    return(
        <Fragment>
            <h1 className="text-center my-5 ">
                Top 10 Clientes que más compran
                
                <Clientes /> 
            </h1>

            <h1 className="text-center my-5 ">
                Top 10 Vendedores 
                
                <Vendedores /> 
            </h1>
            
        </Fragment>
    );
}

export default Panel