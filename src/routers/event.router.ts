import { Router } from "express";
import { GetAllCategoriesController } from "../controllers/categories.controller";
import { GetAllEventController } from "../controllers/event.controller";

const router = Router();

router.get('/', GetAllEventController)
router.get('/categories', GetAllCategoriesController);


export default router;