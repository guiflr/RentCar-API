import { Category } from "../../models/Category";
import { ICategoryRepository, ICreateDTO } from "../ICategoryRespository";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  public create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);

    return category;
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category | null {
    const find = this.categories.find((cat) => cat.name === name);

    return find;
  }
}

export { CategoriesRepository };
