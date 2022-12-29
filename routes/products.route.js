import { Router } from "express";
import { check } from "express-validator";
import { validateFields, validateJWT, haveRole } from "../middleware/index.js";
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from "../controlers/product.controler.js";
import { isValidProduct, isValidCategory } from "../utils/db-validators.js";
export const productRouter = Router();

// get all products
productRouter.get("/", getAllProducts);

// // get a single cat by id

productRouter.get("/:id", 

[
  check('id', 'Is not a valid id').isMongoId(),
  check("id").custom(isValidProduct),
validateFields],
getProduct);

// create new categories - privado with login

productRouter.post(
  "/",
  [
    validateJWT,
    check("productName", "The ProductName is Mandadory").not().isEmpty(),
    check("category").custom(isValidCategory),
    validateFields,
  ],
  createProduct
);
// put - update a categorie by id auth with valid login

productRouter.put(
  "/:id",
  [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(isValidProduct),
    check("productName", "The ProductName is Mandadory").not().isEmpty(),
    validateFields,
  ],

  updateProduct
);
// delete a Product - just the admin change status to false

productRouter.delete(
  "/:id",
  [
    validateJWT,
    haveRole("ADMIN_ROLE"),
    check("id", "Is NOT a valid ID").isMongoId(),
    check("id").custom(isValidProduct),
    validateFields,
  ],
  deleteProduct
);
