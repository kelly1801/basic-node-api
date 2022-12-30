import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middleware/index.js"
import { saveFile } from "../controlers/uploads.controler.js";
export const uploadRouter = Router()

uploadRouter.post('/', saveFile)
