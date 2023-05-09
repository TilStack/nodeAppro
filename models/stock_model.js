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
            type:String,
            required:true,
        },
        priceachat:{
            type:String,
            required:true,
        },
        lieu:{
            type:String,
            required:true,
        },
        createdAt:{
            type:String,
            default: Date.now,
        }
    }
)

const StockModel= mongoose.Model('Stock',StockSchema)
module.exports=StockModel