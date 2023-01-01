import { Schema, model } from "mongoose";

const CategorySchema = Schema({
    categoryName: {
        type: String,
        required: [true, "Name is mandatory"],
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
        required: true

    }
})

CategorySchema.methods.toJSON = function () {
    const { __v, status, _id, ...category } = this.toObject();
    category.categoryId = _id;
    return category
  };

export const Category = model('Category', CategorySchema)