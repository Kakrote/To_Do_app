const mongoose=require('mongoose')
// const express=require('express')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,  required:true},
    password:{type:String, required:true},
})

//hashing password before saving 

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};
const User=mongoose.model("User",userSchema)
module.exports=User;