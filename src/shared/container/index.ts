import { container } from "tsyringe";

import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRespository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
