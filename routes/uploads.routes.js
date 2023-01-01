import { Router } from "express";
import { check } from "express-validator";
import { validateFields, isValidFile } from "../middleware/index.js";
import { saveFile, updateImageCloudinary, showImage } from "../controlers/uploads.controler.js";
import { isValidCollection } from "../utils/db-validators.js";
export const uploadRouter = Router();

uploadRouter.post("/",  saveFile);

uploadRouter.put(
  "/:collection/:id",
  [
    isValidFile,
    check("id", "invalid id").isMongoId(),
    check("collection").custom((c) =>
      isValidCollection(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImageCloudinary
);

uploadRouter.get('/:collection/:id', [
  check("id", "invalid id").isMongoId(),
  check("collection").custom((c) =>
    isValidCollection(c, ["users", "products"])
  ),
  validateFields,
], showImage)
