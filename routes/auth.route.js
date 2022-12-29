import { Router } from "express";
import { check } from "express-validator";
import { login, googleSignIn } from "../controlers/auth.controller.js";
import { validateFields } from "../middleware/validate-fields.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("password", "password is mandatory").not().isEmpty(),
    check("email", "email is mandatory").isEmail(),
    validateFields,
  ],
  login
);
authRouter.post(
  "/google",
  [check("id_token", "id_token is mandatory").not().isEmpty(), validateFields],
  googleSignIn
);
