import { Request, Response, NextFunction } from "express";
import { FindReferralByUserIdService } from "../services/referral.service";

async function FindReferralByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    const referrals = await FindReferralByUserIdService(userId);

    res.status(200).send({
      message: `Get referrals by user id ${userId} success`,
      data: referrals,
    });
  } catch (err) {
    next(err);
  }
}

export { FindReferralByUserIdController };
