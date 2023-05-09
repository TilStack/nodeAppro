const express=require('express')
const app=express()
const mongoose=require("mongoose")
const bodyParser= require("body-parser")

app.use(bodyParser.json())
require('dotenv/config')



app.get('/',(req,res)=>{
    res.send('Hello world')
})
// connect the mongo db
mongoose.connect(process.env.DB_CONNECTION,
    {
      useNewUrlParser: true, useUnifiedTopology: true
    }).then(
      () => console.log('Connected')
    ).catch((err) =>
    {
      console.error(err);
      console.log("Not connected");
    }
);



app.listen(3000,()=>{
    console.log('Start with port 3000')
})