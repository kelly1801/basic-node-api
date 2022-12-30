import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from 'uuid';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFile = (files, allowedExtensions = ["png", "jpg", "jpeg", "gif"], folder = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splittedName = file.name.split(".");
    const extension = splittedName[splittedName.length - 1];

    
    if (!allowedExtensions.includes(extension)) {
      return reject(`The extension ${extension} is not allowed, the valid ones are ${allowedExtensions}`)
    }

    const tempName = `${uuid()}.${extension}`;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      resolve( tempName )
    });
  });
};
