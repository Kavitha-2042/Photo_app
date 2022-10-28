import dotenv from 'dotenv'
dotenv.config()

import bodyParser from "body-parser";
import express, { Application } from "express";
import mongoose from "mongoose";
import userRouter from './Routes/userRouter';
import cors from 'cors';


const app:express.Application = express()

app.use(cors({
    credentials:true,
    origin:process.env.REACT_URL,
    methods:['GET', 'POST']
}))

app.use('/Public',express.static('Public'))


app.use(bodyParser.json())

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/user', userRouter)


mongoose.connect(process.env.MONGO_URL as string, ()=>{
    console.log("db connected")
    app.listen(process.env.PORT_NUMBER, ()=>{
        console.log(`Server running on port ${process.env.PORT_NUMBER}`)
    })
})