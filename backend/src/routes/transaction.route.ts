import { Router } from "express";

import {
  createTransaction,
  getMyTransactions
} from "../controllers/transaction.controller";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  roleMiddleware
} from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  createTransaction
);

router.get(
  "/my-transactions",
  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  getMyTransactions
);

export default router;