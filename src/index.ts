import express from 'express' ; 
import mongoose from 'mongoose' ; 
import cors from 'cors' ; 
import dotenv from 'dotenv' ; 
dotenv.config() ; 
const database_url = process.env.MONGO_API_KEY || 'fallback_database_url'

import authRoutes from './routes/auth' ;
import noteRoutes from './routes/note' ;

const app = express() ; 
const port = 3000 ; 


app.use(cors()) ; 
app.use(express.json()) ; 

app.use("/auth" , authRoutes) ; 
app.use("/note" , noteRoutes) ; 

app.listen( port , ()=>{
    console.log(`app listening at http://localhost: ${port}`)
})

mongoose.connect(database_url , {
    dbName : 'medoc'
}).then(()=>{
    console.log("connected to mongoDb") ; 
}).catch(err=>{
    console.error('Error connecting to mongoDb'  , err) ; 
})