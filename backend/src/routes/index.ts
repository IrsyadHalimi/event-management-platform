import { Router } from "express";

import authRoute from "./auth.route";

import protectedRoute from "./protected.route";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    success: true,
    message:
      "Event Management API Running"
  });
});

router.use(
  "/auth",
  authRoute
);

router.use(
  "/protected",
  protectedRoute
);

export default router;