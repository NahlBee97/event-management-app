import { Request, Response, NextFunction } from "express";
import { FindCouponByUserIdService, UpdateCouponStatusService } from "../services/coupon.service";

export async function FindCouponByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.user_id);
    const coupon = await FindCouponByUserIdService(userId);

    res.status(200).send({
      message: `Get coupon by user id ${userId} success`,
      data: coupon,
    });
  } catch (err) {
    next(err);
  }
}

export async function UpdateCouponStatusController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.user_id);
    const status = req.body.used;
    const updatedCoupon = await UpdateCouponStatusService(userId, status);

    res.status(200).send({
      message: "Update coupon status success",
      data: updatedCoupon,
    });
  } catch (err) {
    next(err);
  }
}