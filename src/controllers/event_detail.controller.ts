import { NextFunction, Request, Response } from "express";
import { GetEventDetailByIdSevice } from "../services/event_detail.services";

export async function GetEventDetailByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const event = await GetEventDetailByIdSevice(eventId);

        res.status(200).send({
            success: true,
            message: `Get event with id ${eventId} is success`,
            data: event
        })
    } catch (err) {
        next(err)
    }
}