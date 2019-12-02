import React from 'react';
import { Query } from 'react-apollo';

import { USUARIO_ACTUAL }  from '../queries';


const Session = Component => props =>  (

    <Query query={USUARIO_ACTUAL} >
        {({ loading, error, data, refetch }) =>  {
            if(loading) return null;
            // escribir el session igual para que en app log(session no haya problema)
            return <Component {...props} refetch={refetch} session={data} />
        }}
    </Query>

    )
export default Session