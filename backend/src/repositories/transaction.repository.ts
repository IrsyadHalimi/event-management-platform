import prisma from "../config/prisma";

export const findEventByIdTransactionRepo =
  async (eventId: string) => {
    return prisma.event.findUnique({
      where: {
        id: eventId
      }
    });
  };

export const createTransactionRepo =
  async (tx: any, data: any) => {
    return tx.transaction.create({
      data
    });
  };

export const reduceSeatRepo =
  async (
    tx: any,
    eventId: string,
    quantity: number
  ) => {
    return tx.event.update({
      where: {
        id: eventId
      },

      data: {
        availableSeats: {
          decrement:
            quantity
        }
      }
    });
  };

export const restoreSeatRepo =
  async (
    tx: any,
    eventId: string,
    quantity: number
  ) => {
    return tx.event.update({
      where: {
        id: eventId
      },

      data: {
        availableSeats: {
          increment:
            quantity
        }
      }
    });
  };

export const findUserTransactionsRepo =
  async (userId: string) => {
    return prisma.transaction.findMany({
      where: {
        userId
      },

      include: {
        event: true
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const findTransactionByIdRepo =
  async (id: string) => {
    return prisma.transaction.findUnique({
      where: {
        id
      },

      include: {
        event: true
      }
    });
  };

export const updateTransactionRepo =
  async (
    tx: any,
    id: string,
    data: any
  ) => {
    return tx.transaction.update({
      where: {
        id
      },

      data
    });
  };

export const findExpiredTransactionsRepo =
  async () => {
    return prisma.transaction.findMany({
      where: {
        status:
          "WAITING_FOR_PAYMENT",

        expiredAt: {
          lte: new Date()
        }
      }
    });
  };

export const findWaitingAdminTransactionsRepo =
  async () => {
    const threeDaysAgo =
      new Date(
        Date.now() -
          3 *
            24 *
            60 *
            60 *
            1000
      );

    return prisma.transaction.findMany({
      where: {
        status:
          "WAITING_FOR_ADMIN_CONFIRMATION",

        updatedAt: {
          lte:
            threeDaysAgo
        }
      }
    });
  };

export const findOrganizerTransactionsRepo =
  async (
    organizerId: string
  ) => {
    return prisma.transaction.findMany({
      where: {
        event: {
          organizerId
        }
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },

        event: {
          select: {
            id: true,
            title: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const organizerStatisticsRepo =
  async (
    organizerId: string
  ) => {
    const totalEvents =
      await prisma.event.count({
        where: {
          organizerId
        }
      });

    const totalTransactions =
      await prisma.transaction.count({
        where: {
          event: {
            organizerId
          }
        }
      });

    const totalRevenue =
      await prisma.transaction.aggregate({
        where: {
          event: {
            organizerId
          },

          status: "DONE"
        },

        _sum: {
          total: true
        }
      });

    const totalCustomers =
      await prisma.transaction.groupBy({
        by: ["userId"],

        where: {
          event: {
            organizerId
          }
        }
      });

    return {
      totalEvents,

      totalTransactions,

      totalRevenue:
        totalRevenue._sum.total || 0,

      totalCustomers:
        totalCustomers.length
    };
  };

export const monthlyRevenueRepo =
  async (
    organizerId: string
  ) => {
    const transactions =
      await prisma.transaction.findMany({
        where: {
          event: {
            organizerId
          },

          status: "DONE"
        },

        select: {
          total: true,
          createdAt: true
        }
      });

    const monthlyData: Record<
      string,
      number
    > = {};

    transactions.forEach(
      (transaction) => {
        const month =
          new Date(
            transaction.createdAt
          ).toLocaleString(
            "en-US",
            {
              month: "short"
            }
          );

        if (!monthlyData[month]) {
          monthlyData[month] = 0;
        }

        monthlyData[month] +=
          transaction.total;
      }
    );

    return Object.entries(
      monthlyData
    ).map(([month, total]) => ({
      month,
      total
    }));
  };

export const dailyRevenueRepo =
  async (
    organizerId: string
  ) => {
    const transactions =
      await prisma.transaction.findMany({
        where: {
          event: {
            organizerId
          },

          status: "DONE"
        },

        select: {
          total: true,
          createdAt: true
        }
      });

    const dailyData: Record<
      string,
      number
    > = {};

    transactions.forEach(
      (transaction) => {
        const day =
          new Date(
            transaction.createdAt
          )
            .toISOString()
            .split("T")[0];

        if (!dailyData[day]) {
          dailyData[day] = 0;
        }

        dailyData[day] +=
          transaction.total;
      }
    );

    return Object.entries(
      dailyData
    ).map(([date, total]) => ({
      date,
      total
    }));
  };