import { Router } from "express";
import { getSearch } from "../controlers/search.controler.js";
export const searchRouter = Router()

searchRouter.get('/:collection/:query', getSearch)
searchRouter.get('/:collection', getSearch)