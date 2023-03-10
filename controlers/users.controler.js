import { response, request } from "express";
import { User }from "../models/index.js";
import bcryptjs from "bcryptjs";
export const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const query = { status: true };
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

export const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...prevValues } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    prevValues.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, prevValues);

  res.json({
    user,
  });
};

export const userPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // number of hashes to encrypt by default it's 10

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  // encrypt the password

  //save in db

  await user.save();
  res.json({
    message: "post API | controler",
    user,
  });
};

export const userPatch = (req, res) => {
  res.json({
    message: "patch API | controler",
  });
};

export const userDelete = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { status: false });
 
  res.json(user);
};
