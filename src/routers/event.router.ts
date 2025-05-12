import { Router } from "express";
import { GetAllCategoriesController } from "../controllers/categories.controller";
import { CreateEventController, DeleteEventByIdController, EditEventByIdController, GetAllEventController } from "../controllers/event.controller";
import { GetEventDetailByIdController } from "../controllers/event_detail.controller";
import { SearchEventController } from "../controllers/search_events.controller";

const router = Router();

router.post('/', CreateEventController);
router.get('/', GetAllEventController)
router.get("/search", SearchEventController);
router.get("/detail/:id", GetEventDetailByIdController);
router.get("/categories", GetAllCategoriesController);
router.put('/:id', EditEventByIdController);
router.delete('/:id', DeleteEventByIdController);

export default router;