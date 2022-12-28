import { request, response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  const key = process.env.SCKEY;
  if (!token) {
    return res.status(401).json({
      msg: "there is not any token on the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, key);

    const user = await User.findById(uid);
if (!user || !user.status) {
    return res.status(401).json({
        msg: 'this user doesnt exist in DB'
    })
}

    // check if user is active

if (!user.status) {
    return res.status(401).json({
        msg: 'user is inactive'
    })
}
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};
