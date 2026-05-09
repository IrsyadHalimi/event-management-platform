import { Router } from "express";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  roleMiddleware
} from "../middleware/role.middleware";

const router = Router();

router.get(
  "/customer",
  authMiddleware,
  roleMiddleware([
    "CUSTOMER"
  ]),
  (req, res) => {
    return res.json({
      success: true,
      message:
        "Customer route accessed"
    });
  }
);

router.get(
  "/organizer",
  authMiddleware,
  roleMiddleware([
    "ORGANIZER"
  ]),
  (req, res) => {
    return res.json({
      success: true,
      message:
        "Organizer route accessed"
    });
  }
);

export default router;