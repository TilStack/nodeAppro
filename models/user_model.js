const mongoose= require('mongoose')
const bcrypt=require('bcrypt')
const { async } = require("rxjs")

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
UserSchema.methods.comparePassword= async function (candidatePassword) { 
    try {
      const isMatch=await bcrypt.compare(candidatePassword,this.password);
      return isMatch;
    } catch (error) {
      throw new Error(error);
    }  
  }

const UserModel= mongoose.model('User',UserSchema)
module.exports=UserModel