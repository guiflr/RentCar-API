import createError from "http-errors";

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../ErrorHandler/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const speciAlreadyExists = await this.specificationRepository.findByName(
      name
    );

    if (speciAlreadyExists) {
      throw createError(400, "Specification already exists");
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
