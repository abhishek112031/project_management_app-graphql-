const express=require('express');
// var { ruruHTML } = require("ruru/server")

const cors = require('cors')
const mongoose=require('mongoose');
const connectTOMongoDB=require('./db/database.js')
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

app.use(cors())


app.use(
    '/graphql',
    graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV==='DEVELOPMENT'

}))


app.listen(process.env.PORT, () => {
    connectTOMongoDB()
  //   mongoose.connect("mongodb://0.0.0.0:27017/mern_chat_app");
    mongoose.connect(process.env.MONGO_URI)
    console.log(`listening on port ${process.env.PORT}...`);
  });


