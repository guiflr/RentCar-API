import fs from "fs";
import csvParse from "csv-parse";

import { ICategoryRepository } from "../../repositories/ICategoryRespository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class UploadCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoryRepository) {}

  private readFile(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      const streamedFile = stream.pipe(parseFile);

      streamedFile
        .on("data", (file) => {
          const [name, description] = file;

          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.readFile(file);  

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryExists = await this.categoryRepository.findByName(name);

      if (!categoryExists) {
        await this.categoryRepository.create({ name, description });
      }
    });
  }
}

export { UploadCategoryUseCase };
