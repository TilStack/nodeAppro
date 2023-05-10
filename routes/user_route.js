const express= require("express")
const { async } = require("rxjs")
const bcrypt=require('bcrypt')
require("dotenv").config()
const router=express.Router()
const faker=require('faker')
const User=require("../models/user_model")
const generateuser = require("../data/user_faker")

//Get all Users
router.get('/',async (req,res)=>{
  try {
    const users= await User.find()
    res.json(users)
    console.log("--Get all users--")
  } catch (error) {
    res.json({message:error})
    console.log("Error")
  }
})

//Get User by Id
router.get('/:Id',async (req,res)=>{
  try{
    const user=await User.findById({_id:req.params.Id})
    res.json(user);
    console.log("--Get User--")
  }catch(error){
    res.json({message:error})
    console.log("Error")
  }
})

//Save User
router.post('/register', (req, res, next) => {
  // Vérifie si l'utilisateur existe déjà dans la base de données
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'L\'utilisateur existe déjà.'
        })
      } else {
        // Si l'utilisateur n'existe pas, crypte le mot de passe et enregistre l'utilisateur dans la base de données
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              name:req.body.name,
              role:req.body.role,
              email:req.body.email,
              password:hash,
              createdAt:req.body.createdAt
            });
            user.save()
              .then(result => {
                console.log('--User created--')
                res.json(user)
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    })
})

//Generate user
router.post('/generate',async (req,res)=>{
  try {   
    const pass=await bcrypt.hash(faker.internet.password(),10)
    const newU=new User(generateuser(pass))
    await newU.save()
    res.json(newU)
    console.log('--User enregistrer--')
  } catch (error) {
    console.log(error)
  }
});


//Update User
router.put('/:Id',async (req,res)=>{
  try {
    const updatedUser=await User.findByIdAndUpdate(      
      req.params.Id,      
      {
        $set:{
            name:req.body.name,
            role:req.body.role,
            email:req.body.email,
            password:hash,
            createdAt:req.body.createdAt
        }
      },
      {
        new:true,
      }
    );

    res.json(updatedUser);
    console.log("--User updated--")
  } catch (error) {
    res.json({message:error})
    console.log("Error");
  }
});


//login
router.post('/login',async (req,res)=>{
  try {
    console.log('--------------------------1')
    const {email,password}=req.body
    console.log(req.body)
    console.log('--------------------------2')
    const user=await User.findOne({email:email})
    if(!user){
      return res.status(400).send({ message: 'Email not Found' })
    }
    console.log('--------------------------3')
    const isPasswordValid=await user.comparePassword(password);
    if(!isPasswordValid){
      return res.status(400).send({ message: 'Email or password is incorrect' })
    }  
    console.log('--------------------------5')
    return res.json(user)
  } catch (error) {
    console.log('--Error--')
  }  
  
});


//Delete User
router.delete("/:Id",async (req,res)=>{
  console.log('.....')
  try {
    const removeUser= await User.deleteOne({_id:req.params.Id})
    res.json(removeUser);
    console.log("--User deleted--")
  } catch (err) {
    res.json({message:err})
    console.log("Error")
  }
});


module.exports=router;
