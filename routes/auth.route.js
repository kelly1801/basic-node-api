import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controlers/auth.controller.js";
import { validateFields } from "../middleware/validate-fields.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  [check("password", "password is mandatory").not().isEmpty(),
    check("email", "email is mandatory").isEmail(), validateFields],
  login
);
