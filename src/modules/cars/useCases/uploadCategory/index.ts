import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { UploadCategoryUseCase } from "./UploadCategoryUseCase";
import { UploadCategoryController } from "./UploadCategoryController";

const categoriesRepository = CategoriesRepository.getInstance();

const uploadCategoryUseCase = new UploadCategoryUseCase(categoriesRepository);

const uploadCategoryController = new UploadCategoryController(
  uploadCategoryUseCase
);

export { uploadCategoryController };
