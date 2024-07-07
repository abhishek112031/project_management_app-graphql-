import React from 'react';
import {gql,useQuery} from '@apollo/client';
import ClientRow from './ClientRow';

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

const Clients = () => {
   const {loading , error ,data}= useQuery(GET_CLIENTS);
   console.log('data-------->',data)
   if(loading) return <p>loading...</p>
   if(error) return <p>error...</p>


  return (
    <div>
       {
        !loading && !error && (
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Phone</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {data.clients.map((client) => (
                        // <tr key={client.id}>
                        //     <td>{client.name}</td>
                        //     <td>{client.email}</td>
                        //     <td>{client.phone}</td>
                        //     <td> 
                        //         <button className='btn btn-sm btn-danger'>Delete</button>
                        //     </td>
                        // </tr>
                        <ClientRow key={client.id} client={client}/>
                    ))}
                </tbody>
            </table>
        )
       }
      
    </div>
  )
}

export default Clients
