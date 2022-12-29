import {Category, Role, User} from "../models/index.js";

export const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`role : ${role} is not registered`);
  }
};

export const isValidEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    
        throw new Error(`email : ${email} is already on use`);
    
  }
};

export const findUserById = async(id) => {
  const userExist = await User.findById(id)
  if(!userExist) {

    throw new Error(`the id: ${id} doesnt exist`)
  }
}

export const isValidCategory = async(id) => {
  const categoryExist = await Category.findById(id)


  if (!categoryExist || !categoryExist.status) {
    throw new Error(`the Category: ${id} doesnt exist`)
  }
}