import bcryptjs from "bcryptjs";
import { response } from "express";
import { generateJWT } from "../utils/generateJWT.js";
import User from "../models/user.js";
import { googleVerify } from "../utils/google-verify.js";
export const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // check if email exist on db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / pasword are not correct - email doesnt exist",
      });
    }

    //check is user is active

    if (!user.status) {
      return res.status(400).json({
        msg: "user is inactive",
      });
    }

    // check is password is valid

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        msg: "password is incorrect",
      });
    }

    // generate jwt

    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong, talk with support",
    });
  }
};

export const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, name, img} = await googleVerify(id_token);

    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        email,
        password: 'fdfd',
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "This user is not in use, contact support",
      });
    }

    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: "Invalid  token , verify the token",
    });
  }
};
