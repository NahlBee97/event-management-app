import prisma from "../lib/prisma";
import { FindUserById } from "./user.service";

async function FindCouponByUserId(userId: number) {
  try {
    const coupon = await prisma.coupons.findFirst({
        where : {
            user_id: userId
        }
    });

    if (!coupon) throw new Error("You don't have any coupon");

    return coupon;

  } catch (err) {
    throw err;
  }
}

async function FindCouponByUserIdService(userId: number) {
  try {
    const referrals = await FindCouponByUserId(userId);

    return referrals;
  } catch (err) {
    throw err;
  }
}

export { FindCouponByUserIdService };
