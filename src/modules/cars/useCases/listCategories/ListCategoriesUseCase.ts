import { Category } from "../../models/Category";

import { ICategoryRepository } from "../../repositories/ICategoryRespository";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}
  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
