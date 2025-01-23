import { Router , Response , Request } from "express";
import { Note } from "../db";
import { adminAuthenticateJwt, userAuthenticateJwt } from "../middleware";
const router = Router() ;


// user routes 

// create a note
router.post('/note' , userAuthenticateJwt , (req , res)=>{
    
})

// get all notes of authenticated user 
router.get('/notes' ,  userAuthenticateJwt , (req , res)=>{

})


// edit specific note by id 
router.patch('/notes/:id' , userAuthenticateJwt , (req , res)=>{

})


// delete specific note by id ; 
router.delete('/nots/:id' , userAuthenticateJwt , (req , res)=>{

})


// Admin routes 


// get all user profiles 
router.get('/users' , adminAuthenticateJwt , (req , res)=>{

})

//fetch detail of specific user

router.get("/users/:id" , adminAuthenticateJwt , (req , res)=>{

})

// delete user profile

router.delete("/users/:id" , adminAuthenticateJwt , (req , res)=>{

})

// get all notes

router.get("/notes" , adminAuthenticateJwt , (req, res)=>{

})

export default router ;