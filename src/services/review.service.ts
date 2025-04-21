import prisma from "../lib/prisma";

export async function GetReviewByEventIdSevice(params: string) {
    try {
        const review = await prisma.review.findFirst({
            where: {
                event_id: Number(params)
            }
        })

        if (!review) throw new Error(`Review with this id ${params} not found`)

        return review
    } catch (err) {
        throw err;
    }


}

export async function GetReviewByUserIdservice(params: string) {
    try {
        const review = await prisma.review.findFirst({
            where: {
                user_id: Number(params)
            }
        })

        if (!review) throw new Error(`Review user with this id ${params} not found`)

        return review
    } catch (err) {
        throw err;
    }
}