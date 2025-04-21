import prisma from "../lib/prisma";

async function FindUserById(userId: number) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function FindUserByIdService(param: number) {
  try {
    const userId = param;
    const user = await FindUserById(userId);

    if (!user) throw new Error("No User Found");

    return user;

  } catch (err) {
    throw err;
  }
}

export { FindUserByIdService };
