const User=require('../models/User')
const jwt=require('jsonwebtoken')

// for registration of new user
exports.registerUser=async (req,res)=>{
    const {name,email,password}=req.body;

    try{
        //checking if user is already exists
        let user=await User.findOne({email});
        if(user) return res.status(400).json({mesg:"User already exists"});

        // create new user
        user=new User({name,email,password});
        await user.save();

        res.status(201).json({msg:"User registered successfully"});

    } catch(err){
        res.status(500).json({error:err.message})
    }
}

// for login
exports.loginUser=async (req,res)=>{
    const {email,password}=req.body;

    try{
        let user= await User.findOne({email});
        if(!user ||!(await user.matchPassword(password))) return res.status(401).json({msg:"Please enter the valid email or password"});

        //genrate the token for user
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"});

        //set cookies
        res.cookie("token",token,{httpOnly:true}).status(200).json({msg:"Login successful"});
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
};