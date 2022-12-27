import { response, request } from "express";
import User from "../models/user.js";
import bcryptjs from 'bcryptjs'
import { validationResult } from "express-validator";
export const userGet = (req = request, res = response) => {
  const query = req.query;

  res.json({
    message: "get API | controler",
    query,
  });
};

export const userPut = (req, res) => {
  const { id } = req.params;
  res.json({
    message: "put API | controler",
    id,
  });
};

export const userPost = async (req, res) => {
 
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });


// number of hashes to encrypt by default it's 10

const salt = bcryptjs.genSaltSync()
user.password = bcryptjs.hashSync(password , salt )
// encrypt the password

//save in db

  await user.save();
  res.json({
    message: "post API | controler",
    user,
  });
};

export const userPatch = (req, res) => {
  res.json({
    message: "patch API | controler",
  });
};

export const userDelete = (req, res) => {
  res.json({
    message: "delete API | controler",
  });
};
