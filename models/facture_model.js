const mongoose=require('mongoose')

const FactureSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },        
        taxe:{
            type: String,
            required: false
        },
        fraislivraison:{
            type:String,
            required:true
        },
        numero:{
            type: String,
            required: true
        },
        date:{
            type:String,
            required:true,
        },
        montant:{
            type: String,
            required:true
        },
        commandeid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Commande',
            required:true
        },
        createdAt:{
            type:String,
            default: Date.now,
        }
    }
)

const FactureModel= mongoose.Model('Facture',FactureSchema)
module.exports=FactureModel