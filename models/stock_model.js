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
        nomProduit:{
            type:String,
            required:true
        },
        quantite:{
            type:Number,
            required:true,
        },
        createdAt:{
            type:String,
            default: Date.now,
        }
    }
)

const StockModel= mongoose.model('Stock',StockSchema)
module.exports=StockModel