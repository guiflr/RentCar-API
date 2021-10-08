import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

import { AppError } from "../../../../ErrorHandler/AppError";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const speciAlreadyExists = this.specificationRepository.findByName(name);

    if (speciAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
