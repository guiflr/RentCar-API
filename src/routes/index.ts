import { Router } from "express";
import asyncHandler from "express-async-handler";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { categoriesRoutes } from "../routes/categories.routes";
import { specificationRoutes } from "../routes/specifications.routes";
import { authenticationRoutes } from "./authentication.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/categories", asyncHandler(categoriesRoutes));
router.use(
  "/specifications",
  ensureAuthenticated,
  asyncHandler(specificationRoutes)
);
router.use("/users", asyncHandler(usersRouter));
router.use(asyncHandler(authenticationRoutes));

export { router };
