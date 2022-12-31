import path from "path";
import fs from "fs";
import { response } from "express";
import { uploadFile } from "../utils/upload-file-helper.js";
import { User, Product } from "../models/index.js";
import { __dirname } from "../utils/dirname.js";
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
// update image for users and products

export const updateImage = async (req, res = response) => {
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

    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }
  model.img = await uploadFile(req.files, collection, undefined);

  model.save();
  res.json(model);
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