import { Router , Response , Request } from "express";
import jwt from 'jsonwebtoken' ; 
import { User , Admin } from "../db";
import { userAuthenticateJwt , adminAuthenticateJwt } from "../middleware";

const router = Router() ; 

//User Router 

// /registger
// /login


// Admin Router

// /register
// /login


