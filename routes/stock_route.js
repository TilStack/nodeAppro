const express= require("express")
const { async } = require("rxjs")
const router=express.Router()
const generatestock=require("../data/stock_faker")
const Stock=require("../models/stock_model")
const Produit=require("../models/produit_model")

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
    nomProduit:req.body.nomProduit,
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
          nomProduit:req.body.nomProduit,
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
    const p =await Produit.find();
    const newS=new Stock(generatestock(p))
    await newS.save()
    res.json(newS)
    console.log('--stock enregistrer--')
  } catch (error) {
    console.log(error)
  }
})


// POST route pour ajouter un produit à un stock
router.post('/:stockId/addProduct', async (req, res) => {
  try {
    const { stockId } = req.params
    const { productId, quantity } = req.body

    const stock = await Stock.findById(stockId)

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' })
    }
    console.log('--------Pass--------')
    const product = await Produit.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    console.log('--------Pass--------')
    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than zero' })
    }
    console.log('--------Pass--------')
    stock.products.push({ product: product._id, quantity })

    await stock.save()
    console.log('-- Product added to stock successfully --')
    return res.json({ message: 'Product added to stock successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
})

// POST route pour retirer un produit d'un stock
router.post('/:stockId/removeProduct', async (req, res) => {
  try {
    const { stockId } = req.params;
    const { productId, quantity } = req.body;

    const stock = await Stock.findById(stockId);
    console.log('--------Pass--------')
    if (!stock) {
      return res.status(404).json({ error: '-- Stock not found-- ' });
    }

    const productIndex = stock.products.findIndex(
      (p) => p.product._id.equals(productId))
    console.log('--------Pass--------'+productIndex)
    if (productIndex === -1) {
      return res.status(404).json({ error: '-- Product not found in stock-- ' });
    }

    const product = stock.products[productIndex];
    console.log('--------Pass--------')
    if (product.quantity < quantity) {
      return res.status(400).json({ error: '-- Not enough quantity in stock--' });
    }

    product.quantity -= quantity;
    console.log('--------Pass-------- '+product.quantity)
    if (product.quantity === 0) {
      stock.products.splice(productIndex, 1);
    }
    console.log('--------Pass--------')
    await stock.save();
    console.log('-- Product removed from stock successfully --')
    return res.json({ message: '-- Product removed from stock successfully --' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
})

// Route pour récupérer le nombre de produits en stock, retirés et encore présents
router.get('/sum/summary', async (req, res) => {
  try {
    const summary = await Stock.getStockSummary()
    res.json(summary)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports=router
