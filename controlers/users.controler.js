import { response, request } from "express";

export const userGet = (req = request, res = response) => {
const query = req.query

    res.json({
    message: "get API | controler",
    query
  });
};

export const userPut = (req, res) => {
  
    const { id } = req.params
    res.json({
    message: "put API | controler",
id  
});
};

export const userPost = (req, res) => {
  const {name, age} = req.body;

  res.json({
    message: "post API | controler",
    name,
    age
  });
};

export const userPatch = (req, res) => {
  res.json({
    message: "patch API | controler",
  });
};

export const userDelete = (req, res) => {
  res.json({
    message: "delete API | controler",
  });
};
