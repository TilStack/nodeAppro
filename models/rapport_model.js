const mongoose= require('mongoose')

const RapportSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },        
        stock:           
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        },
        commande:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Commande'
        }],
        quantity:{
            type:String,
            required:true
        },
        createdAt:{
            type: String,
            default: Date.now,
        }
    }
)

const RapportModel= mongoose.model('Rapport',RapportSchema)
module.exports=RapportModel