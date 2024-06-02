const express=require('express');
// var { ruruHTML } = require("ruru/server")
require('dotenv').config();
const schema=require('./schema/schema.js')

const {graphqlHTTP}=require('express-graphql')

const port=process.env.PORT||5000;
const app=express();

 
// // Serve the GraphiQL IDE.
// app.get("/", (_req, res) => {
//   res.type("html")
//   res.end(ruruHTML({ endpoint: "/graphql" }))
// })


app.use(
    '/graphql',
    graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV==='DEVELOPMENT'

}))


app.listen(port,()=>{
    console.log(`Application listening on ${port}...`);
})


