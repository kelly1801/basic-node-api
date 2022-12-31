import path from "path";
import fs from "fs";
import { response } from "express";
import { uploadFile } from "../utils/upload-file-helper.js";
import { User, Product } from "../models/index.js";
import { __dirname } from "../utils/dirname.js";
import * as Cloudinary from 'cloudinary'
import * as dotenv from 'dotenv' 
dotenv.config()

Cloudinary.config(process.env.CLOUDINARY_URL)


export const saveFile = async (req, res = response) => {
  try {
    if (!req.files || !Object.keys(req.files).length || !req.files.file) {
      res.status(400).json({ msg: "No files were uploaded." });
      return;
    }

    const fileName = await uploadFile(req.files, "prueba", [
      "txt",
      "md",
      "jpg",
    ]);

    res.json({
      fileName,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const showImage = async(req, res = response) => {

  const { collection, id } = req.params;
  
  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not user with id: ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not product with id: ${id}`,
        });
      }
      break;

    default:
      return res
        .status(500)
        .json({ msg: `this ${collection} is not validated` });
  }

  if (model.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, model.img);
console.log(pathImg)
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg)
    }
  }
 
  const noImgPath = path.join(__dirname, "../assets/no-image.jpg");

  res.sendFile(noImgPath);
}
// update image for users and products

export const updateImageCloudinary = async (req, res = response) => {
  const { collection, id } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not user with id: ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not product with id: ${id}`,
        });
      }
      break;

    default:
      return res
        .status(500)
        .json({ msg: `this ${collection} is not validated` });
  }

  if (model.img) {
  const nameArr = model.img.split('/')
  const imgName = nameArr[nameArr.length - 1]

  const [public_id] = imgName.split('.')

Cloudinary.uploader.destroy(public_id)
  }
  const {tempFilePath } = req.files.file
   
  const {secure_url} = await Cloudinary.uploader.upload(tempFilePath)
  model.img = secure_url
  await model.save()

  

  res.json(model);
};
