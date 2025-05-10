import { Router } from "express";
import { GetAllCategoriesController } from "../controllers/categories.controller";
import { CreateEventController, DeleteEventByIdController, EditEventByIdController, GetAllEventController } from "../controllers/event.controller";
import { GetEventDetailByIdController } from "../controllers/event_detail.controller";
import { SearchEventController } from "../controllers/search_events.controller";
import { EOGuard, VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

//create
router.post('/',VerifyToken, EOGuard, CreateEventController);

//read
router.get('/', GetAllEventController)
router.get("/search", SearchEventController);
router.get("/detail/:id", GetEventDetailByIdController);
router.get("/categories", GetAllCategoriesController);

//update
router.post('/:id', VerifyToken, EOGuard, EditEventByIdController);

//delete
router.delete('/:id', VerifyToken, EOGuard, DeleteEventByIdController);

export default router;