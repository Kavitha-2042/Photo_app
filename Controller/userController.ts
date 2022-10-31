import dotenv from "dotenv";
dotenv.config();

import express from "express";
import joi, { array } from "joi";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import multer from "multer";

import userModel from "../Model/userModel";
import fileModel from "../Model/fileModel";

import { ModifiedRequest } from "../interface";

export const Signup = (
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, email, password, conpassword } = req.body;

  const validation = joi.object({
    name: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).uppercase().required(),
    conpassword: password,
  });

  validation
    .validateAsync({ name, email, password, conpassword })
    .then((validateResponse) => {
      userModel
        .find({ email })
        .then((emailResponse) => {
          if (emailResponse.length > 0) {
            return res.json({ message: "User already exist" });
          }

          if (conpassword !== password) {
            return res.json({
              message: "Confirm Password doesn't match with Password",
            });
          }

          bcryptjs
            .hash(password, 15)
            .then((hashPassword) => {
              userModel
                .create({ name, email, password: hashPassword })
                .then((createResponse) => {
                  let token = jwt.sign(
                    { _id: createResponse._id },
                    process.env.SECRET_KEY as string
                  );

                  return res.json({
                    message: "Signup successfull!",
                    user: createResponse,
                    token,
                    auth: true,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const Signin = (
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body;

  const validation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).uppercase().required(),
  });

  validation
    .validateAsync({ email, password })
    .then((validateResponse) => {
      userModel
        .findOne({ email })
        .then((emailResponse) => {
          console.log("Running");
          if (!emailResponse) {
            return res.json("User doesn't exist");
            console.log("Become true");
          }
          console.log("Flow");

          bcryptjs
            .compare(password, emailResponse.password)
            .then((comparingResult) => {
              console.log("Comparing result: ", comparingResult);
              console.log("Checking pass");
              if (!comparingResult) {
                return res.json({ message: "Incorrect Password" });
                console.log("Pass failed");
              }
              console.log("passed");

              let token = jwt.sign(
                { _id: String(emailResponse._id) },
                process.env.SECRET_KEY as string
              );

              return res.json({
                message: "Signin successful!",
                user: emailResponse,
                token,
                auth: true,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const Status = (
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.users) {
    return res.status(401).json({
      user: null,
      message: "You're not logged in!",
      auth: false,
    });
  } else {
    return res.status(200).json({
      user: req.users,
      message: "You're logged in!",
      auth: true,
    });
  }
};

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const upload = multer({ storage: fileStorageEngine });

export const ImageUpload = (req: ModifiedRequest, res: express.Response) => {
  //const {email} = req.users

  const { image} = req.body

  console.log("Image result: ", req.users);

  let newItem = {
    image: (req.files as Express.Multer.File[])[0].path,
    email:req.users.email
  };


      new fileModel(newItem)
        .save()
        .then((fileResponse) => {
          console.log("EMail send: ", fileResponse);
          console.log("File Send Successfully");
          return res.status(200).json({
            message: "File send successfully",
            file: (req.files as Express.Multer.File[])[0].path,
          });
          console.log("FIle response: ", fileResponse);
        })
        .catch((err) => console.log(err));
      }
    
    
export const AllPhotos = (
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  fileModel
    .find({})
    .then((findResponse) => {
      if (findResponse) {
        return res.json({
          message: "Message sent",
          file: findResponse,
        });
      }
    })
    .catch((err) => console.log(err));
};

export const MyPhotos = (
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email } = req.users;

  userModel
    .findOne({ email: req.users.email })
    .then((emailResponse) => {
      console.log("Emailll: ", email);

      fileModel
        .find({email})
        .then((fileResponse) => {
          console.log("FILRESPONSE: ", fileResponse);
          return res.json({
            message: "FIle response",
            email: req.users.email,
            file: fileResponse,
            auth: true,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
