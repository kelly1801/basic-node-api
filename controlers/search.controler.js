import { response } from "express";
import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import { User, Category, Product } from "../models/index.js";
const allowedCollection = [
  "users",
  "categories",
  "products"
  ];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const user = await User.findById(term);
    if (user) {
      return res.json({ results: [user] });
    } else {
      return res.json({ results: [] });
    }
  }

  // regex to avoid make the search case insensitive
  const regex = new RegExp(term, "i");
  const condition = {
    $or: [
      { name: regex, status: true },
      { email: regex, status: true },
    ],
    $and: [{ status: true }],
  };
  const users = await User.find(condition);
  const totalResults = await User.count(condition);

  if (users) {
    res.json({ totalResults, results: users });
  }
};


const searchCategory = async (term = "", res = response) => {
    const isMongoId = isValidObjectId(term);
  
    if (isMongoId) {
      const category = await Category.findById(term);
      if (category) {
        return res.json({ results: [category] });
      } else {
        return res.json({ results: [] });
      }
    }
  
    // regex to avoid make the search case insensitive
    const regex = new RegExp(term, "i");
    const condition = { categoryName: regex, status: true }
    const categories = await Category.find(condition);
    const totalResults = await Category.count(condition);
  
    if (categories) {
      res.json({ totalResults, results: categories });
    }
  };
  
  const searchProduct = async (term = "", res = response) => {
    const isMongoId = isValidObjectId(term);
  
    if (isMongoId) {
   
      const product = await Product.findById(term)
      .populate('category', 'categoryName')
      .populate('user', 'name')
      if (product) {
        return res.json({ results: [product] });
      } else {
        return res.json({ results: [] });
      }
    }
  
    // regex to avoid make the search case insensitive
    const regex = new RegExp(term, "i");
    const condition = { productName: regex, status: true }
    const products = await Product.find(condition)
    .populate('category', 'categoryName')
    .populate('user', 'name')
    const totalResults = await Product.count(condition);
  
    if (products) {
      res.json({ totalResults, results: products });
    }
  };
  
export const getSearch = (req, res = response) => {
  const { collection, query } = req.params;

  if (!allowedCollection.includes(collection)) {
    return res.status(400).json({
      msg: `the allowed collections are ${allowedCollection}`,
    });
  }

  switch (collection) {
    case "users":
        searchUsers(query, res);
      break;
    case "categories":
        searchCategory(query, res);
      break;
    case "products":
        searchProduct(query, res);
      break;
 
    default:
      res.status(500).json({
        msg: `the collection: ${collection} is not done`,
      });
  }
};
