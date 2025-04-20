import { Router } from "express";
import { GetAllCategoriesController } from "../controllers/categories.controller";

const router = Router();

router.get('/categories', GetAllCategoriesController);

export default router;