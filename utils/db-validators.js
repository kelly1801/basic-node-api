import Role from "../models/role.js";
import User from "../models/user.js";
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
