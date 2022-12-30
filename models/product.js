import { Schema, model } from "mongoose";

const ProductSchema = Schema({
    productName: {
    type: String,
    required: [true, "productName is mandatory"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String },
  stock: { type: Boolean, default: true },
  img: {type: String}
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, _id, ...data } = this.toObject();
  data.productId = _id;
  return data;
};

export const Product = model("Product", ProductSchema);
