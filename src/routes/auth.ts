import { Router , Response , Request } from "express";
import jwt from 'jsonwebtoken' ; 
import { User , Admin } from "../db";
import { userAuthenticateJwt , adminAuthenticateJwt } from "../middleware";
const userSecret = process.env.USER_SECRET || 'userSecret' ; 
const adminSecret = process.env.ADMIN_SECRET || 'adminSecret' ; 

const router = Router() ; 

//User Router 

router.post('/userRegister' , async(req , res)=>{
    const {name , email , password} = req.body ;
    
    const user = await User.findOne({email}) ; 

    if(user){
        res.status(403).json({message : 'user aready exist'}) ; 
    }else{
        const newUser = new User({name , email , password}) ; 
        await newUser.save() ; 
        const token = jwt.sign({id : newUser._id} , userSecret , {expiresIn:'1h'}) ;
        res.json({message:"user created successfully" , token , userId : newUser._id})
    }

})

router.post('/userLogin' , async(req , res)=>{

    const {email , password} = req.body ; 
    const user = await User.findOne({email , password}) ; 

    if(user){
        const token = jwt.sign( {id: user._id} , userSecret , {expiresIn: '1h'})
        res.json({message: 'Logged in Succefully' , token , userId: user._id}) ; 
    }else{
        res.status(403).json({message : "invalid email or password"}) ; 
    }
})


// Admin Router

router.post("/adminRegister" , async(req ,res)=>{


    const {name , email , password} = req.body  ; 

    const user = await Admin.findOne({email}) ; 

    if(user){
        res.status(403).json({message: "user already axist"}) ; 
    }else{
        const newAdmin = new Admin({name , email , password}) ; 
        await newAdmin.save() ; 
        const token = jwt.sign({id: newAdmin._id} , adminSecret , {expiresIn: '1h'}) 
        res.json({message:'admin created successfully' , token , adminId : newAdmin._id})
    }
})

router.post('/adminLogin' , async(req , res)=>{

    const {email , password} = req.body ; 
    const user = await User.findOne({email , password}) ; 

    if(user){
        const token = jwt.sign( {id: user._id} , adminSecret , {expiresIn: '1h'})
        res.json({message: 'admin Logged in Succefully' , token , userId: user._id}) ; 
    }else{
        res.status(403).json({message : "invalid email or password"}) ; 
    }
})

export default router ; 
