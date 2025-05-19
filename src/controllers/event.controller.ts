import { NextFunction, Request, Response } from "express";
import { CreateEventService, DeleteEventByIdService, EditEventByIdService, GetAllEventService } from "../services/event.service";
import { GetEventDetailByIdService } from "../services/event_detail.services";

export async function GetAllEventController(req: Request, res: Response, next: NextFunction) {
    try {
        const events = await GetAllEventService();

        res.status(200).send({
            message: 'Success',
            count: events.length,
            data: events
        })
    } catch (err) {
        next(err)
    }
}

export async function CreateEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newEvent= await CreateEventService(req.body);

    res.status(200).send({
      message: "Create new event Success",
      data: newEvent,
    });
  } catch (err) {
    next(err);
  }
}
export async function EditEventByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventId = parseInt(req.params.id)
    const updatedEvent = await EditEventByIdService(eventId, req.body);

    res.status(200).send({
      message: `Edit Event by id ${eventId} Success`,
      data: updatedEvent,
    });
  } catch (err) {
    next(err);
  }
}

export async function DeleteEventByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventId = parseInt(req.params.id)
    const deletedEvent = await GetEventDetailByIdService(req.params.id);
    await DeleteEventByIdService(eventId)

    res.status(200).send({
      message: `Delete Event by id ${eventId} Success`,
      data: deletedEvent,
    });
  } catch (err) {
    next(err);
  }
}

