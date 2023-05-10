const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generatefacture=require("../data/facture_faker")
const Facture=require("../models/facture_model")
const Commande=require("../models/commande_model")

//Get all factures
router.get('/',async (req,res)=>{
  try {
    const factures= await Facture.find()
    res.json(factures)
    console.log("--Get all facture--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Get facture by Id
router.get('/:Id',async (req,res)=>{
  try{
    const facture=await Facture.findById({_id:req.params.Id})
    res.json(facture)
    console.log("--Get facture By Id--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
})

//Save facture
router.post('/register',async (req,res)=>{
  const facture=new Facture({    
    taxe:req.body.taxe,
    fraislivraison:req.body.fraislivraison,
    numero:req.body.numero,
    date:req.body.date,
    montant:req.body.montant,
    commandeid:req.body.commandeid,
    createdAt:req.body.createdAt,
  })
  try {
    const savedfacture=await facture.save()
    res.json(savedfacture)
    console.log("--facture Saved--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Update facture
router.put('/:Id',async (req,res)=>{
    try {
      const updatedfacture=await Facture.findByIdAndUpdate(      
        req.params.Id,      
        {
          $set:{
            taxe:req.body.taxe,
            fraislivraison:req.body.fraislivraison,
            numero:req.body.numero,
            date:req.body.date,
            montant:req.body.montant,
            commandeid:req.body.commandeid,
            createdAt:req.body.createdAt,
          }
        },
        {
          new:true,
        }
      )
  
      res.json(updatedfacture)
      console.log("--facture updated--")
    } catch (error) {
      res.json({message:error})
      console.log("Error")
    }
  })

//Delete facture
router.delete("/:Id",async (req,res)=>{
  try {
    const removefacture= await Facture.deleteOne({_id:req.params.Id})
    res.json(removefacture)
    console.log("--facture deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
})


//Generate facture
router.post('/generate',async (req,res)=>{
  try {    
    const commande=await Commande.find()
    const newR=new Facture(generatefacture(commande))
    await newR.save()
    res.json(newR)
    console.log('--facture enregistrer--')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router;
