import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { categoriesRoutes } from "../routes/categories.routes";
import { specificationRoutes } from "../routes/specifications.routes";
import { authenticationRoutes } from "./authentication.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", ensureAuthenticated, specificationRoutes);
router.use("/users", usersRouter);
router.use(authenticationRoutes);

export { router };
