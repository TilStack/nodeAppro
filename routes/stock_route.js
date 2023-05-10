const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generatestock=require("../data/stock_faker")
const Stock=require("../models/stock_model")

//Get all stocks
router.get('/',async (req,res)=>{
  try {
    const stocks= await Stock.find()
    res.json(stocks)
    console.log("--Get all stock--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Get stock by Id
router.get('/:Id',async (req,res)=>{
  try{
    const stock=await Stock.findById({_id:req.params.Id})
    res.json(stock)
    console.log("--Get stock By Id--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
})

//Save stock
router.post('/register',async (req,res)=>{
  const stock=new Stock({    
    date:req.body.date,
    quantity:req.body.quantity,
    produit:req.body.produit,
    priceachat:req.body.priceachat,
    lieu:req.body.lieu,
    createdAt:req.body.createdAt
  })
  try {
    const savedstock=await stock.save()
    res.json(savedstock)
    console.log("--stock Saved--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Update stock
router.put('/:Id',async (req,res)=>{
  try {
    const updatedstock=await Stock.findByIdAndUpdate(      
      req.params.Id,      
      {
        $set:{
          date:req.body.date,
          quantity:req.body.quantity,
          produit:req.body.produit,
          priceachat:req.body.priceachat,
          lieu:req.body.lieu,
          createdAt:req.body.createdAt
        }
      },
      {
        new:true,
      }
    )

    res.json(updatedstock)
    console.log("--Stock updated--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Delete stock
router.delete("/:Id",async (req,res)=>{
  try {
    const removestock= await Stock.deleteOne({_id:req.params.Id})
    res.json(removestock)
    console.log("--stock deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
})


//Generate stock
router.post('/generate',async (req,res)=>{
  try {    
    const newS=new Stock(generatestock())
    await newS.save()
    res.json(newS)
    console.log('--stock enregistrer--')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router
