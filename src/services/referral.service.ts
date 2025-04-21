import prisma from "../lib/prisma";
import { FindUserById } from "./user.service";

async function FindReferralByUserId(userId: number) {
  try {
    const user = await FindUserById(userId);

    const referralCode = user?.referral_code;

    if (!referralCode) {
      throw new Error("Referral code must be a valid string");
    };

    const referrals = await prisma.referral_logs.findMany({
       where: {
        referral_code_used: referralCode
       },
    });

    if (referrals.length === 0) throw new Error("You have no referral yet");

    return referrals;

  } catch (err) {
    throw err;
  }
}

async function FindReferralByUserIdService(userId: number) {
  try {
    const referrals = await FindReferralByUserId(userId);

    return referrals;
  } catch (err) {
    throw err;
  }
}

export { FindReferralByUserIdService };
