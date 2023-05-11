const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generateapprovisionnement=require("../data/approvisionnement_faker")
const Approvisionnement=require("../models/approvisionnement_model")
const Produit=require("../models/produit_model")

//Get all approvisionnements
router.get('/',async (req,res)=>{
  try {
    const approvisionnements= await Approvisionnement.find()
    res.json(approvisionnements)
    console.log("--Get all approvisionnement--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Get approvisionnement by Id
router.get('/:Id',async (req,res)=>{
  try{
    const approvisionnement=await Approvisionnement.findById({_id:req.params.Id})
    res.json(approvisionnement)
    console.log("--Get approvisionnement By Id--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
})

//Save approvisionnement
router.post('/register',async (req,res)=>{
  const approvisionnement=new Approvisionnement({    
    produit:req.body.produit,
    type:req.body.type,
    quantity:req.body.quantity,
    createdAt:req.body.createdAt,
  })
  try {
    const savedapprovisionnement=await approvisionnement.save()
    res.json(savedapprovisionnement)
    console.log("--approvisionnement Saved--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Update approvisionnement
router.put('/:Id',async (req,res)=>{
    try {
      const updatedapprovisionnement=await Approvisionnement.findByIdAndUpdate(      
        req.params.Id,      
        {
          $set:{
            produit:req.body.produit,
            type:req.body.type,
            quantity:req.body.quantity,
            createdAt:req.body.createdAt,
          }
        },
        {
          new:true,
        }
      )
  
      res.json(updatedapprovisionnement)
      console.log("--approvisionnement updated--")
    } catch (error) {
      res.json({message:error})
      console.log("Error")
    }
  })

//Delete approvisionnement
router.delete("/:Id",async (req,res)=>{
  try {
    const removeapprovisionnement= await Approvisionnement.deleteOne({_id:req.params.Id})
    res.json(removeapprovisionnement)
    console.log("--approvisionnement deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
})


//Generate approvisionnement
router.post('/generate',async (req,res)=>{
  try {    
    const produits=await Produit.find()
    const newA=new Approvisionnement(generateapprovisionnement(produits))
    await newA.save()
    res.json(newA)
    console.log('--approvisionnement enregistrer--')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router;
