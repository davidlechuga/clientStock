import gql from "graphql-tag"; //  resalta el texto de la QUERy notation con colores

export const CLIENTES_QUERY = gql `
   query getClientes( $limite: Int , $offset: Int, $vendedor: String ) {
        getClientes (limite: $limite , offset: $offset, vendedor : $vendedor) {
            id 
            nombre
            empresa
            apellido
        }
        totalClientes (vendedor : $vendedor)
   }
`; 

export const CLIENTE_QUERY = gql `

    query ConsultarCliente ($id:ID){
        getCliente(id: $id){
            id
            nombre
            apellido
            empresa
            edad
            tipo
            emails{
                email
            }
        }
    }`;

export const OBTENER_PRODUCTOS = gql `

query obtenerProductos($limite: Int, $offset: Int, $stock : Boolean) {
  obtenerProductos (limite: $limite, offset: $offset, stock : $stock) {
    id
    nombre
    precio
    stock 
  }
  totalProductos
}
`;
  

export const OBTENER_PRODUCTO = gql `
query obtenerProducto ($id : ID!) {
  obtenerProducto (id : $id) {
    nombre
    precio
    stock
  }
}
`;


export const OBTENER_PEDIDOS = gql `

query obtenerPedidos ( $cliente : ID  ){
    obtenerPedidos ( cliente : $cliente) {
    id
    total
    fecha
    estado
    pedido{
      id
      cantidad
    }
  }
}
`;

export const TOP_CLIENTES = gql `

query topClientes {
  topClientes{
    total
    cliente{
      nombre
    }
  }
}

`;

export const TOP_VENDEDORES = gql `

query topVendedores {
  topVendedores{
    total
    vendedor{
      nombre
    }
  }
}

`;


// usuarios

export const USUARIO_ACTUAL = gql `

query obtenerUsuario {
  obtenerUsuario {
    id
    usuario
    nombre
    rol
  }
}

`;