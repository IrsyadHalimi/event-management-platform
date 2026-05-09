import { z } from "zod";

export const createEventSchema =
  z.object({
    title: z.string().min(3),

    description:
      z.string().min(10),

    category: z.string(),

    location: z.string(),

    price: z.number(),

    availableSeats:
      z.number(),

    startDate: z.string(),

    endDate: z.string(),

    thumbnail:
      z.string().optional()
  });

export const updateEventSchema =
  z.object({
    title:
      z.string().min(3).optional(),

    description:
      z.string().min(10).optional(),

    category:
      z.string().optional(),

    location:
      z.string().optional(),

    price:
      z.number().optional(),

    availableSeats:
      z.number().optional(),

    startDate:
      z.string().optional(),

    endDate:
      z.string().optional(),

    thumbnail:
      z.string().optional()
  });