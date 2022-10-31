import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import jwt from 'jsonwebtoken'

import { ModifiedRequest } from '../interface'
import userModel from '../Model/userModel'

export const middleware = (req:ModifiedRequest, res:express.Response, next:express.NextFunction) =>{
    let token = req.headers['jwt-token'] as string
    console.log(token)

    if(token){
        try {
            let verifying = jwt.verify(token,process.env.SECRET_KEY as string) 

            let decoding:any = jwt.decode(token)
            console.log(decoding)
    
            if(req.path !== '/signup' && req.path !== '/signin' ){
                userModel.findById(decoding._id)
                .then((response)=>{
                    if(response?.password){
                        response.password=''
                    }
                    req.users = response
                    next()
                })
                .catch(err=>console.log(err))
            }
            else{
                return res.json({message:"Invalid path"})
            }
        } catch (error) {
                return res.json({message:"Token expired or invalid"})
        }
       

    }
    else{
        if(req.path === '/signup' || req.path === '/signin'){
            next()
        }
        else{
            return res.json({message:"Path is invalid"})
        }
    }
}