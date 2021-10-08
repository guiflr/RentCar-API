import { Category } from "../models/Category";

interface ICreateDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  findByName(name: string);
  list(): Category[];
  create({ description, name }: ICreateDTO): ICreateDTO;
}

export { ICreateDTO, ICategoryRepository };
