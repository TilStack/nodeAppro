const mongoose=require('mongoose')
const { async } = require("rxjs")

const StockSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        date:{
            type:Date,
        },        
        nomProduit:{
            type:String,
            required:true
        },
        products:{
            type:Array,
            default:[],
            required:false,
        },
        quantity:{
            type:Number,
            required:true,
        },
        createdAt:{
            type:String,
            default: Date.now,
        }
    }
)

// Méthode pour récupérer le nombre de produits en stock, retirés et encore présents
StockSchema.methods.getStockSummary = async function () {
    const total = await this.countDocuments()
    const retirés = await this.countDocuments({ date: { $exists: true } })
    const présents = total - retirés
  
    return {
        total,
        retirés,
        présents
    }
}

const StockModel= mongoose.model('Stock',StockSchema)
module.exports=StockModel