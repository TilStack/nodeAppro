const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generatefournisseur=require("../data/fournisseur_faker")
const Fournisseur=require("../models/fournisseur_model")
const Produit=require("../models/produit_model")

//Get all fournisseurs
router.get('/',async (req,res)=>{
  try {
    const fournisseurs= await Fournisseur.find()
    res.json(fournisseurs)
    console.log("--Get all fournisseur--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Get fournisseur by Id
router.get('/:Id',async (req,res)=>{
  try{
    const fournisseur=await Fournisseur.findById({_id:req.params.Id})
    res.json(fournisseur)
    console.log("--Get fournisseur By Id--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
})

//Save fournisseur
router.post('/register',async (req,res)=>{
  const fournisseur=new Fournisseur({    
    name:req.body.name,
    adresse:req.body.adresse,
    telephone:req.body.telephone,
    email:req.body.email,
    produits:req.body.produits,
    createdAt:req.body.createdAt
  })
  try {
    const savedfournisseur=await fournisseur.save()
    res.json(savedfournisseur)
    console.log("--fournisseur Saved--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Update fournisseur
router.put('/:Id',async (req,res)=>{
    try {
      const updatedfournisseur=await Fournisseur.findByIdAndUpdate(      
        req.params.Id,      
        {
          $set:{
            name:req.body.name,
            adresse:req.body.adresse,
            telephone:req.body.telephone,
            email:req.body.email,
            produits:req.body.produits,
            createdAt:req.body.createdAt
          }
        },
        {
          new:true,
        }
      )
  
      res.json(updatedfournisseur)
      console.log("--Fournisseur updated--")
    } catch (error) {
      res.json({message:error})
      console.log("Error")
    }
  })

//Delete fournisseur
router.delete("/:Id",async (req,res)=>{
  try {
    const removefournisseur= await Fournisseur.deleteOne({_id:req.params.Id})
    res.json(removefournisseur)
    console.log("--fournisseur deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
})


//Generate fournisseur
router.post('/generate',async (req,res)=>{
  try {    
    const produits=await Produit.find()
    const newR=new Fournisseur(generatefournisseur(produits))
    await newR.save()
    res.json(newR)
    console.log('--fournisseur enregistrer--')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router;
