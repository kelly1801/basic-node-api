import { response } from "express";
import { uploadFile } from "../utils/upload-file.js";
export const saveFile = async (req, res = response) => {
  if (!req.files || !Object.keys(req.files).length || !req.files.file) {
    return res.status(400).json({ msg: "No files were uploaded." });
  }

  try {
    const fileName = await uploadFile(req.files, ["txt", "md"], 'texts');
    res.json({fileName});
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
}
