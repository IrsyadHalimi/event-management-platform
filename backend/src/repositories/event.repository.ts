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
        ? { contains: category, mode: "insensitive" } 
        : undefined,
      
        location: location 
          ? { contains: location, mode: "insensitive" } 
          : undefined
      },

      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const findEventBySlugRepo = 
  async (id: string) => {
    return prisma.event.findUnique({
      where: {
        id: id
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

export const findEventByIdRepo =
  async (id: string) => {
    return prisma.event.findUnique({
      where: {
        id
      }
    });
  };

export const updateEventRepo =
  async (
    id: string,
    data: any
  ) => {
    return prisma.event.update({
      where: {
        id
      },

      data
    });
  };

export const deleteEventRepo =
  async (id: string) => {
    return prisma.event.delete({
      where: {
        id
      }
    });
  };

export const findOrganizerEventsRepo =
  async (
    organizerId: string
  ) => {
    return prisma.event.findMany({
      where: {
        organizerId
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const getHeroEvents =
  async () => {
    return prisma.event.findMany({
      take: 3,

      orderBy: {
        createdAt: "desc"
      },

      select: {
        id: true,

        title: true,

        thumbnail: true
      }
    });
  };