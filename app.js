const express=require('express')
const app=express()
const mongoose=require("mongoose")
const bodyParser= require("body-parser")

app.use(bodyParser.json())
require('dotenv/config')

const userRoute=require("./routes/user_route")
const commandeRoute=require("./routes/commande_route")
const factureRoute=require("./routes/facture_route")
const approvisionnementRoute=require("./routes/approvisionnement_route")
const produitRoute=require("./routes/produit_route")
const stockRoute=require("./routes/stock_route")
const rapportRoute=require("./routes/rapport_route")
const fournisseurRoute=require("./routes/fournisseur_route")

//Using the route by app.use
app.use("/user",userRoute)
app.use("/commande",commandeRoute)
app.use("/facture",factureRoute)
app.use("/approvisionnement",approvisionnementRoute)
app.use("/produit",produitRoute)
app.use("/stock",stockRoute)
app.use("/rapport",rapportRoute)
app.use("/fournisseur",fournisseurRoute)


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
      console.log("Not connected")
    }
);



app.listen(3000,()=>{
    console.log('Start with port 3000')
})