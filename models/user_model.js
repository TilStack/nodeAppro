const mongoose= require('mongoose')

const UserSchema=mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },        
        name:           
        {
            type:String,
            required: true
        },
        role:{
            type:String,
            enum:['admin','other'],
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        createdAt:{
            type: String,
            default: Date.now,
        }
    }
)

const UserModel= mongoose.Model('User',UserSchema)
module.exports=UserModel