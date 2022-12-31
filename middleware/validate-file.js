import { response } from "express";

export const isValidFile = (req, res = response, next) => {
    if (!req.files || !Object.keys(req.files).length || !req.files.file) {
        return res.status(400).json({ msg: "No files were uploaded." });

      
      }
      next()

 }