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
        code_barre:{
            type: String,
            required: true,
        },
        prixAchat:{
            type: String,
            required: true,
        },
        prixVente:{
            type:String,
            required:false
        },
        stock:{
            type:String,
            required:false,
        },
        status:{
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