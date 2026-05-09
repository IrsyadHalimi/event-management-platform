import { Router } from "express";

import {
  createTransaction,
  uploadPaymentProof,
  acceptTransaction,
  rejectTransaction,
  getMyTransactions,
  getOrganizerTransactions,
  getOrganizerStatistics,
  getMonthlyRevenue,
  getDailyRevenue
} from "../controllers/transaction.controller";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  roleMiddleware
} from "../middleware/role.middleware";

import { upload }
  from "../config/multer";

const router = Router();

router.post(
  "/",
  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  createTransaction
);

router.post(
  "/:id/upload-proof",

  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  upload.single(
    "paymentProof"
  ),

  uploadPaymentProof
);

router.patch(
  "/:id/accept",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  acceptTransaction
);

router.patch(
  "/:id/reject",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  rejectTransaction
);

router.get(
  "/my-transactions",

  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  getMyTransactions
);

router.get(
  "/organizer/all",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  getOrganizerTransactions
);

router.get(
  "/organizer/statistics",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  getOrganizerStatistics
);

router.get(
  "/organizer/monthly-revenue",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  getMonthlyRevenue
);

router.get(
  "/organizer/daily-revenue",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  getDailyRevenue
);

export default router;