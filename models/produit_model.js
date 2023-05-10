const mongoose =require('mongoose')

const ProduitSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        quantity:{
            type:Number,
            required:true
        },
        statut:{
            type:Boolean,
            required:true,
            default:false
        },
        createdAt:{
            type:String,
            default:Date.now,
        }
    }
)

const ProduitModel=mongoose.model("Produit",ProduitSchema)
module.exports=ProduitModel