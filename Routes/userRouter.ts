import express from 'express'

import { ModifiedRequest, ModifiedRouter } from '../interface'

import * as userController from '../Controller/userController'
import { middleware } from '../Middleware/middleware'
import { upload } from '../Controller/userController'


const userRouter:ModifiedRouter = express.Router()

userRouter.post('/signup', middleware, userController.Signup)

userRouter.post('/signin', middleware, userController.Signin)

userRouter.get('/status', middleware, userController.Status)

userRouter.post('/imageupload',middleware,  upload.array('image', 10), userController.ImageUpload)

userRouter.get('/allphotos', middleware, upload.array('image', 10), userController.AllPhotos)

userRouter.get('/myphotos', middleware, upload.array('image',10),userController.MyPhotos)

export default userRouter