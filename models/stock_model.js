const mongoose=require('mongoose')

const StockSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        date:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
        },
        produit:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Produit'
        },
        priceachat:{
            type:String,
            required:true,
        },
        lieu:{
            type:String,
            required:false,
        },
        createdAt:{
            type:String,
            default: Date.now,
        }
    }
)

const StockModel= mongoose.model('Stock',StockSchema)
module.exports=StockModel