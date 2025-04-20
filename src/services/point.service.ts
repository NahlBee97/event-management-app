import prisma from "../lib/prisma";

async function FindPointByUserId(userId: number) {
  try {
    const userPoint = await prisma.points.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!userPoint) throw new Error("You don't have any points yet")

    return userPoint;
  } catch (err) {
    throw err;
  }
}

async function FindPointByUserIdService(userId: number) {
  try {
    const userPoint = await FindPointByUserId(userId);

    return userPoint;
  } catch (err) {
    throw err;
  }
}

export { FindPointByUserIdService };
