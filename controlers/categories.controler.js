import { response, request } from "express";
import { Category } from "../models/category.js";

// get all categories - pagination - total - use Populate method
export const getAllCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};
// get single cat - populate

export const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");
  res.json({
    category,
  });
};
// update the categoryName

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  // avoids the id and status to be changed by users
  const { _id, status, ...data } = req.body;

  data.categoryName = data.categoryName.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, {new: true});

  res.json(category)
};

export const createCategory = async (req, res = response) => {
  const categoryName = req.body.categoryName.toUpperCase();
  const categoryDB = await Category.findOne({ categoryName });

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${categoryDB.categoryName} already exists`,
    });
  }

  const data = {
    categoryName,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();
  res.status(201).json(category);
};

// delete category, change status to false

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { status: false });

  res.json(category);
};
