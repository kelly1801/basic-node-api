import { Schema, model } from "mongoose";

 const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    // enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function() {
  const {__v, password, ...user} = this.toObject();
return user
}

export default model('User', userSchema)
