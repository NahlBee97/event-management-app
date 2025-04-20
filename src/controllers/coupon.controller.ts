import { Request, Response, NextFunction } from "express";
import { FindCouponByUserIdService } from "../services/coupon.service";

async function FindCouponByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    const coupon = await FindCouponByUserIdService(userId);

    res.status(200).send({
      message: `Get coupon by user id ${userId} success`,
      data: coupon,
    });
  } catch (err) {
    next(err);
  }
}

export { FindCouponByUserIdController };
