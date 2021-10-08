import { ICategoryRepository } from "../../repositories/ICategoryRespository";

import { AppError } from "../../../../ErrorHandler/AppError";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists", 400);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
