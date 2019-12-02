import React,{Fragment} from 'react';
import {Query} from 'react-apollo';
import {TOP_VENDEDORES} from '../../queries';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

 const Vendedores = () => {
    return(
        <Query query={TOP_VENDEDORES}>
            {({loading, error, data}) => {
                if (loading) return 'loading...';
                if (error) return `Error: ${error.message}`;
                console.log(data);

                const vendedoresGrafica = [];
                // nombre do los resolvers para el map (video 187)
                data.topVendedores.map((vendedor, index) => {
                    vendedoresGrafica[index] = {
                        ...vendedor.vendedor[0],
                        total: vendedor.total
                    }
                });
                    console.log(vendedoresGrafica);
                    
                return(
                    <Fragment>
                        <div className="container" id="container-charts"> 
                            <BarChart width={900} height={300} data={vendedoresGrafica}
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

 export default Vendedores