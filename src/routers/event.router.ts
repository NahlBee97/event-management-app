import { Router } from "express";
import { GetAllCategoriesController } from "../controllers/categories.controller";
import { CreateEventController, DeleteEventByIdController, EditEventByIdController, GetAllEventController } from "../controllers/event.controller";
import { GetEventDetailByIdController } from "../controllers/event_detail.controller";

const router = Router();

router.get('/', GetAllEventController)

router.get('/detail/:id', GetEventDetailByIdController)

router.get('/categories', GetAllCategoriesController);

router.post('/', CreateEventController);

router.post('/:id', EditEventByIdController);

router.delete('/:id', DeleteEventByIdController);

export default router;