import { Router } from "express";
import { check } from "express-validator";
import {
  userGet,
  userPut,
  userPatch,
  userDelete,
  userPost,
} from "../controlers/users.controler.js";

import {
   haveRole, 
   validateJWT,
   validateFields
} from '../middleware/index.js'
import {
  isValidRole,
  isValidEmail,
  findUserById,
} from "../utils/db-validators.js";

export const userRouter = Router();

userRouter.get("/", userGet);
userRouter.put(
  "/:id",
  [
    check("id", "Is NOT a valid ID").isMongoId(),
    check("id").custom(findUserById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  userPut
);
userRouter.post(
  "/",
  [
    check("name", "Name is Mandatory").not().isEmpty(),
    check("email").isEmail().custom(isValidEmail),
    check("password", "Password has to be more than 6 letters").isLength({
      min: 6,
    }),
    check("role").custom(isValidRole),
    validateFields,
  ],
  userPost
);
userRouter.patch("/", userPatch);
userRouter.delete("/:id",[
  validateJWT,
  haveRole('ADMIN_ROLE', 'SALES_ROLE'),
  check("id", "Is NOT a valid ID").isMongoId(),
  check("id").custom(findUserById),
  validateFields
], userDelete);
