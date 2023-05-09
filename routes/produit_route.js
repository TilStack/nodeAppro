const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generateproduit=require("../data/produit_faker")
const Produit=require("../models/produit_model")

//Get all produits
router.get('/',async (req,res)=>{
  try {
    const produits= await Produit.find()
    res.json(produits)
    console.log("--Get all produit--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
});

//Get produit by Id
router.get('/:Id',async (req,res)=>{
  try{
    const produit=await Produit.findById({_id:req.params.Id})
    res.json(produit)
    console.log("--Get produit By Id--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
});

//Save produit
router.post('/register',async (req,res)=>{
  const produit=new Produit({    
    name:req.body.name,
    description:req.body.description,
    code_barre:req.body.code_barre,
    prixAchat:req.body.prixAchat,
    prixVente:req.body.prixVente,
    statut:req.body.statut,
    createdAt:req.body.createdAt
  })
  try {
    const savedproduit=await produit.save()
    res.json(savedproduit)
    console.log("--produit Saved--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Update produit
router.put('/:Id',async (req,res)=>{
  try {
    const updatedproduit=await Produit.findByIdAndUpdate(      
      req.params.Id,      
      {
        $set:{
          name:req.body.name,
          description:req.body.description,
          code_barre:req.body.code_barre,
          prixAchat:req.body.prixAchat,
          prixVente:req.body.prixVente,
          statut:req.body.statut,
          createdAt:req.body.createdAt
        }
      },
      {
        new:true,
      }
    )

    res.json(updatedproduit)
    console.log("--Produit updated--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Delete produit
router.delete("/:Id",async (req,res)=>{
  try {
    const removeproduit= await Produit.deleteOne({_id:req.params.Id})
    res.json(removeproduit)
    console.log("--produit deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
});


//Generate produit
router.post('/generate',async (req,res)=>{
  try {    
    const newR=new Produit(generateproduit())
    await newR.save()
    res.json(newR)
    console.log('--produit enregistrer--')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router;
