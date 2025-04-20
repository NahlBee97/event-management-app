import { Request, Response, NextFunction } from "express";
import { FindPointByUserIdService } from "../services/point.service";

async function FindPointByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    const userPoint = await FindPointByUserIdService(userId);

    res.status(200).send({
      message: `Get point by user id ${userId} success`,
      data: userPoint,
    });
  } catch (err) {
    next(err);
  }
}

export { FindPointByUserIdController };
