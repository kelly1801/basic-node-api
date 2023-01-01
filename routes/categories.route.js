import { Router } from "express";
import { check } from "express-validator";
import { validateFields, validateJWT, haveRole } from "../middleware/index.js";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controlers/categories.controler.js";
import { isValidCategory } from "../utils/db-validators.js";
export const catRouter = Router();
// create custom middleware to check the id exists
// get all the categories
catRouter.get("/", getAllCategories);

// get a single cat by id

catRouter.get("/:id", 

[
  check('id', 'Is not a valid id').isMongoId(),
  check("id").custom(isValidCategory),
validateFields],
getCategory);
// create new categories - privado with login

catRouter.post(
  "/",
  [
    validateJWT,
    check("categoryName", "The categoryName is Mandadory").not().isEmpty(),
    validateFields,
  ],
  createCategory
);
// put - update a categorie by id auth with valid login

catRouter.put(
  "/:id",
  [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(isValidCategory),
    check("categoryName", "The categoryName is Mandadory").not().isEmpty(),
    validateFields,
  ],

  updateCategory
);
// delete a category - just the admin change status to false

catRouter.delete(
  "/:id",
  [
    validateJWT,
    haveRole("ADMIN_ROLE"),
    check("id", "Is NOT a valid ID").isMongoId(),
    check("id").custom(isValidCategory),
    validateFields,
  ],
  deleteCategory
);
