import prisma from "../lib/prisma";

async function FindCouponByUserId(userId: number) {
  try {
    const coupon = await prisma.coupons.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!coupon) throw new Error("You don't have any coupon");

    return coupon;
  } catch (err) {
    throw err;
  }
}

async function UpdateCouponStatus(userId: number, status: boolean) {
  try {
    const coupon = await FindCouponByUserId(userId);

    if (!coupon) throw new Error("You don't have any coupon");

    if (coupon.used === true) throw new Error("This coupon is already used")
    
    const updateCoupon = await prisma.coupons.updateMany({
      where: {
        user_id: userId,
      },
      data: {
        used: status
      },
    });

    return updateCoupon;
  } catch (err) {
    throw err;
  }
}

export async function FindCouponByUserIdService(userId: number) {
  try {
    const coupon = await FindCouponByUserId(userId);

    return coupon;
  } catch (err) {
    throw err;
  }
}

export async function UpdateCouponStatusService(userId: number, status: boolean) {
  try {
    const updatedCoupon = await UpdateCouponStatus(userId, status);

    return updatedCoupon;
  } catch (err) {
    throw err;
  }
}
