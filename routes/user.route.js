import { Router } from "express";
import { check } from "express-validator";
import {
  userGet,
  userPut,
  userPatch,
  userDelete,
  userPost,
} from "../controlers/users.controler.js";
import { validateFields } from "../middleware/validate-fields.js";
import { validateJWT } from "../middleware/validate-jwt.js";
import {
  isValidRole,
  isValidEmail,
  findUserById,
} from "../utils/db-validators.js";

export const router = Router();

router.get("/", userGet);
router.put(
  "/:id",
  [
    check("id", "Is NOT a valid ID").isMongoId(),
    check("id").custom(findUserById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  userPut
);
router.post(
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
router.patch("/", userPatch);
router.delete("/:id",[
  validateJWT,
  check("id", "Is NOT a valid ID").isMongoId(),
  check("id").custom(findUserById),
  validateFields
], userDelete);
