import { z } from "zod";

export const createTransactionSchema =
  z.object({
    eventId:
      z.string(),

    quantity:
      z.number().min(1)
  });