import prisma from "../config/prisma";

export const createEventRepo =
  async (data: any) => {
    return prisma.event.create({
      data
    });
  };

export const findEventsRepo =
  async ({
    search,
    category,
    location,
    page,
    limit
  }: any) => {
    return prisma.event.findMany({
      where: {
        title: {
          contains:
            search || "",
          mode: "insensitive"
        },

        category: category
          ? category
          : undefined,

        location: location
          ? location
          : undefined
      },

      skip: (page - 1) * limit,

      take: limit,

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const findEventBySlugRepo =
  async (slug: string) => {
    return prisma.event.findUnique({
      where: {
        slug
      },

      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  };