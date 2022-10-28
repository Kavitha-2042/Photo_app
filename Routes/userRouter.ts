import express from 'express'

import { ModifiedRequest, ModifiedRouter } from '../interface'

import * as userController from '../Controller/userController'
import { middleware } from '../Middleware/middleware'
import { upload } from '../Controller/userController'


const userRouter:ModifiedRouter = express.Router()

userRouter.post('/signup', middleware, userController.Signup)

userRouter.post('/signin', middleware, userController.Signin)

userRouter.get('/status', middleware, userController.Status)

userRouter.post('/imageupload', upload.array('image', 20), userController.ImageUpload)

export default userRouter