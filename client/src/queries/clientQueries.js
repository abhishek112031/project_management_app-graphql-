
import {gql} from '@apollo/client';

const GET_CLIENTS = gql`
query getClients {
  clients{
    id,
    phone,
    name,
    email
  }

}
`

export {GET_CLIENTS}