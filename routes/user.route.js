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
import { isValidRole } from "../utils/db-validators.js";
export const router = Router();

router.get("/", userGet);
router.put("/:id", userPut);
router.post("/", [
  check("name", "Name is Mandatory").not().isEmpty(),
  check("email", "email is not valid").isEmail(),
  check("password", "Password has to be more than 6 letters").isLength({min: 6}),
  check('role').custom(
  isValidRole
    ),
  validateFields

], userPost);
router.patch("/", userPatch);
router.delete("/", userDelete);
