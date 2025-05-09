import prisma from "../lib/prisma";

export async function GetAllCategoriesService() {

    try {
        const categories = await prisma.event_categories.findMany();
        if (!categories) throw new Error('Categories not found')
        return categories
    } catch (err) {
        throw err;
    }
}
