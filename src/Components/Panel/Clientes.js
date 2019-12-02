import React,{Fragment} from 'react';
import {Query} from 'react-apollo';
import {TOP_CLIENTES} from '../../queries';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

 const Clientes = () => {
    return(
        <Query query={TOP_CLIENTES}>
            {({loading, error, data}) => {
                if (loading) return 'loading...';
                if (error) return `Error: ${error.message}`;
                console.log(data);

                const topClientesGrafica = [];

                data.topClientes.map((pedido, index) => {
                    topClientesGrafica[index] = {
                        ...pedido.cliente[0],
                        total: pedido.total
                    }
                });
                
                    console.log(topClientesGrafica);
                    
                return(
                    <Fragment>
                        <div className="container" id="container-charts"> 
                            <BarChart width={900} height={300} data={topClientesGrafica}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="nombre"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="total" fill="#8884d8" />
                            </BarChart>
                         </div>
                    </Fragment>
                 )
            }}
        </Query>
    )
 }

 export default Clientes