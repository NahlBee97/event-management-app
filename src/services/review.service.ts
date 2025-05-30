import prisma from "../lib/prisma";
import { IReview } from "../interfaces/review.interface";

async function FindUserReview(user_id: number, event_id: number) {
    try {
        const existingReview = await prisma.reviews.findUnique({
            where: {
                user_id_event_id: {
                    user_id,
                    event_id,
                },
            },
        });
        return existingReview

    } catch (error) {
        throw error
    }
}

export async function GetReviewByEventIdSevice(params: string) {
    try {
        const review = await prisma.reviews.findMany({
            where: {
                event_id: Number(params)
            },
            include: {
                users: {
                    select: {
                        first_name: true,
                        last_name: true,
                        profile_picture: true
                    },
                },
            },
        })

        if (!review) throw new Error(`Review with this id ${params} not found`)

        return review
    } catch (err) {
        throw err;
    }
}

export async function GetReviewByUserIdservice(params: string) {
    try {
        const review = await prisma.reviews.findFirst({
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

export async function CreateReviewService(params: IReview) {
    try {
        const isExistReview = await FindUserReview(params.user_id, params.event_id)
        if (isExistReview) throw new Error("Your review already exist, you had reviewed this event!")

        const newReview = await prisma.reviews.create({
            data: {
                user_id: params?.user_id,
                event_id: params?.event_id,
                message: params?.message,
                rating: params?.rating,
            },
        });
        return newReview

    } catch (error) {
        throw error
    }
}

export async function UpdateReviewService(params: IReview) {
    try {
        const { user_id, event_id, message, rating } = params;

        const isExistReview = await FindUserReview(user_id, event_id)
        if (!isExistReview) throw new Error("Review not found")

        const updateReview = await prisma.reviews.update({
            where: {
                user_id_event_id: {
                    user_id,
                    event_id,
                },
            },
            data: {
                message,
                rating
            },
        });
        return updateReview
    } catch (error) {
        throw error
    }
}

export async function DeleteReviewService(id: number) {
  try {
    await prisma.reviews.delete({
        where: {
            id
        }
    })
  } catch (error) {
    throw error;
  }
}