import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";

import { ICategoryRepository } from "../../repositories/ICategoryRespository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  async execute(): Promise<Category[]> {
    return await this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
