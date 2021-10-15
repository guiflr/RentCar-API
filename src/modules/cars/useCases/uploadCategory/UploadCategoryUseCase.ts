import fs from "fs";
import csvParse from "csv-parse";

import { ICategoryRepository } from "../../repositories/ICategoryRespository";

interface IImportCategory {
  name: string;
  description: string;
}

class UploadCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

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
        .on("end", () => resolve(categories))
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.readFile(file);

    categories.map((category) => {
      const { name, description } = category;

      const categoryExists = this.categoryRepository.findByName(name);

      if (!categoryExists) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}

export { UploadCategoryUseCase };
