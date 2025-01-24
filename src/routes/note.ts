import { Router , Response , Request } from "express";
import { Note, User } from "../db";
import { adminAuthenticateJwt, userAuthenticateJwt } from "../middleware";
const router = Router() ;


// user routes 

// create a note
router.post('/createNote' , userAuthenticateJwt , async(req , res)=>{
    
    try{

        const {name , description , status} = req.body ; 
        const userId = req.headers["userId"] ;
        const newPost = new Note({name , description , status ,userId}) ; 
        await newPost.save() ; 
        res.status(201).json({"newPost" : newPost , message: "note created successfully"})

    }catch(err){
        console.log("ayush") ; 
        res.status(500).json({err})
    }
})

// get all notes of authenticated user 
router.get('/getNotes' ,  userAuthenticateJwt , async(req , res)=>{
    
    
    try{
        const userId = req.headers["userId"] || '' ; 
        const notes = await Note.find({ userId: userId });
        res.status(200).json(notes) ;  
    }catch(err){
        
        res.status(500).json({error: 'failed to get user notes'}) ; 
    }
})


// edit specific note by id 
router.patch('/notes/:id' , userAuthenticateJwt , async(req: Request , res: Response): Promise<void> =>{

    try{

        const noteId = req.params.id ; 
        const userId = req.headers['userId'] ; 
        const {title , description} = req.body ; 
        console.log(noteId) ; 
        console.log(userId) ; 
        const updatedNote = await Note.findOneAndUpdate(
            {_id: noteId , userId}, 
            {title , description } , 
            {new : true }
        )

        if(!updatedNote){
             res.status(404).json({error: "Note note found or not authorized"}) ; 
             return 
        }

        res.status(200).json(updatedNote)

    }catch(err){
        console.log(err) ; 
        res.status(500).json({error: "failed to update note"}) ; 
    }
})


// delete specific note by id ; 
router.delete('/notes/:id' , userAuthenticateJwt , async(req:Request , res:Response)=>{

    try{

        const noteId = req.params.id ; 
        const userId = req.headers["userId"]; 

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
          }

        const deletedNote = await Note.findOneAndDelete({
            _id: noteId,
            userId,
        });

        if (!deletedNote) {
            res.status(404).json({ error: "Note not found or not authorized to delete" });
            return;
          }

          res.status(200).json({ message: "Note deleted successfully", note: deletedNote });

    }catch(err){
        console.log(err) ; 
        res.status(500).json({error: "failed to delete note"})
    }
})


// Admin routes 


// get all user profiles 
router.get('/users' , adminAuthenticateJwt , async(req , res)=>{

    try{
        const users = await User.find() ; 
        res.status(200).json(users) ; 
    }catch(err){
        console.log(err) ; 
        res.status(500).json({error: "failed to get users"}) ; 
    }
})

//fetch detail of specific user

router.get("/users/:id" , adminAuthenticateJwt , async(req , res)=>{

    try{

        const userId = req.params.id ; 

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
          }

        const findUser = await User.findOne({
            _id: userId,
        });

        if (!findUser) {
            res.status(404).json({ error: "User not found" });
            return;
          }

          res.status(200).json({ message: "user found", note: findUser });

    }catch(err){
        console.log(err) ; 
        res.status(500).json({error: "failed to find user"})
    }
})

// delete user profile

router.delete("/users/:id" , adminAuthenticateJwt , async(req , res)=>{

    try{

        const userId = req.params.id ; 

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
          }

        const deletedUser = await User.findOneAndDelete({
            _id: userId,
        });

        if (!deletedUser) {
            res.status(404).json({ error: "user not found " });
            return;
          }

          res.status(200).json({ message: "User deleted successfully", note: deletedUser });

    }catch(err){
        console.log(err) ; 
        res.status(500).json({error: "failed to delete user"})
    }
})

// get all notes

router.get("/notes" , adminAuthenticateJwt , async(req, res)=>{
    try{
        const notes = await Note.find();
        res.status(200).json(notes) ;  
    }catch(err){
        
        res.status(500).json({error: 'failed to get user notes'}) ; 
    }
})

export default router ;