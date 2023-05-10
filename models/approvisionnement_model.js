const mongoose= require('mongoose')

const ApprovisionnementSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },        
        produit:           
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produit'
        },
        type:{
            type:String,
            enum:['entre','sortie'],
            required:true
        },
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

const ApprovisionnementModel= mongoose.model('Approvisionnement',ApprovisionnementSchema)
module.exports=ApprovisionnementModel