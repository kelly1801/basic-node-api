import { Router } from "express";
import {
  userGet,
  userPut,
  userPatch,
  userDelete,
  userPost,
} from "../controlers/users.controler.js";
export const router = Router();

router.get("/", userGet);
router.put("/:id", userPut);
router.post("/", userPost);
router.patch("/", userPatch);
router.delete("/", userDelete);
