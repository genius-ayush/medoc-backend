import { Request , Response , NextFunction } from "express"
import jwt from "jsonwebtoken";
const userSecret = process.env.USER_SECRET || 'userSecret' ; 
const adminSecret = process.env.ADMIN_SECRET || 'adminSecret' ; 


export const userAuthenticateJwt =(req : Request , res: Response , next : NextFunction)=>{

    const authHeader = req.headers.authorization ; 

    if(authHeader){
        const token = authHeader.split(" ")[1] ; 
        
        jwt.verify(token , userSecret , (err , payload)=>{
            if(err){
                return res.sendStatus(403) ;
            }

            if(!payload){
                return res.sendStatus(403) ; 
            }

            if(typeof payload == 'string'){
                return res.sendStatus(403) ; 
            }

            req.headers["userId"] = payload.id ; 
            next() ; 
        })
        
    }else{
        res.sendStatus(401).json({message : 'unauthorized'}) ; 
    }
}


export const adminAuthenticateJwt =( req : Request , res: Response , next: NextFunction)=>{

    const authHeader = req.headers.authorization ;

    if(authHeader){

        const token = authHeader.split(" ")[1] ; 

        jwt.verify(token , adminSecret , (err , payload)=>{

            if(err){
                return res.sendStatus(403)
            }

            if(!payload){
                return res.sendStatus(403) ; 
            }
            
            if(typeof payload == 'string'){
                return res.sendStatus(403) ; 
            }

            req.headers["userId"] = payload.id ; 
            next() ; 
        })

    }else{
        res.send(401).json({message : 'unauthorized'}) ;  
    }
}