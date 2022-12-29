import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middleware/validate-fields.js";

export const catRouter = Router();

// get all the categories
catRouter.get('/', (req, res) => {
    res.json('working')
})

// get a single cat by id

catRouter.get('/:id', (req, res) => {
    res.json('single cat')
})
// create new categories - privado with login

catRouter.post('/', (req, res) => {
    res.json('new cat')
})
// put - update a categorie by id auth with valid login

catRouter.put('/:id', (req, res) => {
    res.json('update category by id')
})
// delete a category - just the admin change status to false

catRouter.delete('/:id', (req, res) => {
    res.json('delete just for admins')
})
