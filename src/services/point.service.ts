import prisma from "../lib/prisma";

//find user by id function
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

//edit user by id service
async function FindPointByUserIdService(userId: number) {
  try {
    const userPoint = await FindPointByUserId(userId);

    return userPoint;
  } catch (err) {
    throw err;
  }
}

export { FindPointByUserIdService };
