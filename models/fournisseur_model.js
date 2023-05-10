const mongoose= require('mongoose')

const FournisseurSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        name:{
            type: String,
            required: true
        },
        adresse:{
            type: String,
            required: true
        },
        telephone:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
        },
        produits:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produit'
            }
        ],
        createdAt:{
            type: String,
            default: Date.now,
        }
    }
)

const FournisseurModel= mongoose.model('Fournisseur',FournisseurSchema)
module.exports=FournisseurModel