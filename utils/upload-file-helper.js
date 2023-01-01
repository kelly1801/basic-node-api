import { v4 as uuid } from "uuid";
import path from "path";
import { __dirname } from "./dirname.js";

export const uploadFile = (
  files,
  folder = "",
  allowedExtensions = ["png", "jpg", "jpeg", "gif"]
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const dividedName = file.name.split(".");
    const extension = dividedName[dividedName.length - 1];

    if (!allowedExtensions.includes(extension)) {
      return reject(
        `The extension ${extension} is not allowed, these are: ${allowedExtensions}`
      );
    }

    const tempName = `${uuid()}.${extension}`;
    const uploadPath = path.join(__dirname, "../uploads", folder, tempName);
    console.log(uploadPath);

    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(tempName);
    });
  });
};
