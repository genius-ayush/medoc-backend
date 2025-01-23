import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    name : String , 
    email : String , 
    password : String , 
} , {timestamps: true})



export const adminSchema = new mongoose.Schema({
    name : String ,
    email : String , 
    password : String , 
} ,{timestamps : true})

export const noteSchema = new mongoose.Schema({

    title: String , 
    description : String , 
    status: {type:String , default: 'active'} , 
    userId : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required: true}
} , {timestamps: true})

export const User = mongoose.model('User' , userSchema) ; 
export const Admin = mongoose.model('Admin' , adminSchema) ; 
export const Post = mongoose.model('Note' , noteSchema) ; 