const mongoose=require('mongoose')

const CommandeSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        fournisseurId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fournisseur'
        },
        dateCommande:{
            type: String,
            required: true,
            default:Date.now
        },
        dateLivraison:{
            type: String,
            required: true,
            default:Date.now
        },
        produit:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produit'
        },
        quantity:{
            type: Number,
            required: true
        },
        prixUnitaire:{
            type:String,
            required:false
        },
        montant:{
            type: Number,
            required: false
        },
        createdAt:{
            type:String,
            default: Date.now,
        }
    }
)

const CommandeModel= mongoose.Model('Commande',CommandeSchema)
module.exports=CommandeModel