import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoryRepository, ICreateDTO } from "../ICategoryRespository";
class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    console.log(category);

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const find = await this.repository.findOne({ name });

    return find;
  }
}

export { CategoriesRepository };
