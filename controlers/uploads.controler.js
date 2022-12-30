import { response } from "express";
import { uploadFile } from "../utils/upload-file-helper.js";

export const saveFile = async(req, res = response) => {

    if (!req.files || !Object.keys(req.files).length || !req.files.file) {
       res.status(400).json({msg: 'No files were uploaded.'})
     return
    }
  
    const fileName = await uploadFile(req.files)
  
    res.json({
     fileName
    })
}
