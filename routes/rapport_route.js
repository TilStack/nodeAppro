const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generaterapport=require("../data/rapport_faker")
const Rapport=require("../models/rapport_model")

//Get all rapports
router.get('/',async (req,res)=>{
  try {
    const rapports= await Rapport.find()
    res.json(rapports)
    console.log("--Get all rapport--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Get rapport by Id
router.get('/:Id',async (req,res)=>{
  try{
    const rapport=await Rapport.findById({_id:req.params.Id})
    res.json(rapport)
    console.log("--Get rapport By Id--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
})

//Save rapport
router.post('/register',async (req,res)=>{
  const rapport=new Rapport({    
    stock:req.body.stock,
    commande:req.body.commande,
    quantity:req.body.quantity,
    createdAt:req.body.createdAt
  })
  try {
    const savedrapport=await rapport.save()
    res.json(savedrapport)
    console.log("--rapport Saved--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Update rapport
router.put('/:Id',async (req,res)=>{
  try {
    const updatedrapport=await Rapport.findByIdAndUpdate(      
      req.params.Id,      
      {
        $set:{
          stock:req.body.stock,
          commande:req.body.commande,
          quantity:req.body.quantity,
          createdAt:req.body.createdAt
        }
      },
      {
        new:true,
      }
    )

    res.json(updatedrapport)
    console.log("--Rapport updated--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Delete rapport
router.delete("/:Id",async (req,res)=>{
  try {
    const removerapport= await Rapport.deleteOne({_id:req.params.Id})
    res.json(removerapport)
    console.log("--rapport deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
})


//Generate rapport
router.post('/generate',async (req,res)=>{
  try {    
    const newR=new Rapport(generaterapport())
    await newR.save()
    res.json(newR)
    console.log('--rapport enregistrer--')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router;
