import { response, request } from "express";
import { Product } from "../models/product.js";

// get all products - pagination - total - use Populate method
export const getAllProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "categoryName")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};
// get single cat - populate

export const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  .populate("user", "name")
  .populate("category", "categoryName");
  res.json({
    product,
  });
};
// update the ProductName

export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  // avoids the id and status to be changed by users
  const { _id, status, ...data } = req.body;

  data.productName = data.productName.toUpperCase();
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

export const createProduct = async (req, res = response) => {
  const productName = req.body.productName
const {status, user, ...body} = req.body

const productDB = await Product.findOne({productName})
  if (productDB) {
    return res.status(400).json({
      msg: `The Product ${productDB.productName} already exists`,
    });
  }

  const data = {
    ...body,
    productName: body.productName.toUpperCase(), 
    user: req.user._id,
  };


  const product = new Product(data);
  
  await product.save();
  res.status(201).json(product);
}

// delete Product, change status to false

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { status: false });

  res.json(product);
};
