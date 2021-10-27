import { Category } from "../entities/Category";

interface ICreateDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ description, name }: ICreateDTO): Promise<void>;
}

export { ICreateDTO, ICategoryRepository };
