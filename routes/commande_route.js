const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generatecommande=require("../data/commande_faker")
const Commande=require("../models/commande_model")
const Fournisseur=require("../models/fournisseur_model")
const Produit=require("../models/produit_model")

//Get all commandes
router.get('/',async (req,res)=>{
  try {
    const commandes= await Commande.find()
    res.json(commandes)
    console.log("--Get all commande--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Get commande by Id
router.get('/:Id',async (req,res)=>{
  try{
    const commande=await Commande.findById({_id:req.params.Id})
    res.json(commande)
    console.log("--Get commande By Id--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
})

//Save commande
router.post('/register',async (req,res)=>{
  const commande=new Commande({    
    fournisseurId:req.body.fournisseurId,
    dateCommande:req.body.dateCommande,
    dateLivraison:req.body.dateLivraison,
    produit:req.body.produit,
    quantity:req.body.quantity,
    prixUnitaire:req.body.prixUnitaire,
    montant:req.body.montant,
    createdAt:req.body.createdAt,
  })
  try {
    const savedcommande=await commande.save()
    res.json(savedcommande)
    console.log("--commande Saved--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Update commande
router.put('/:Id',async (req,res)=>{
    try {
      const updatedcommande=await Commande.findByIdAndUpdate(      
        req.params.Id,      
        {
          $set:{
            fournisseurId:req.body.fournisseurId,
            dateCommande:req.body.dateCommande,
            dateLivraison:req.body.dateLivraison,
            produit:req.body.produit,
            quantity:req.body.quantity,
            prixUnitaire:req.body.prixUnitaire,
            montant:req.body.montant,
            createdAt:req.body.createdAt,
          }
        },
        {
          new:true,
        }
      )
  
      res.json(updatedcommande)
      console.log("--commande updated--")
    } catch (error) {
      res.json({message:error})
      console.log("Error")
    }
  })

//Delete commande
router.delete("/:Id",async (req,res)=>{
  try {
    const removecommande= await Commande.deleteOne({_id:req.params.Id})
    res.json(removecommande)
    console.log("--commande deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
})


//Generate commande
router.post('/generate',async (req,res)=>{
  try {    
    const fournisseurs=await Fournisseur.find();
    const produits=await Produit.find();
    const newR=new Commande(generatecommande(fournisseurs,produits))
    await newR.save()
    res.json(newR)
    console.log('--commande enregistrer--')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router;
