import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUSeCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, driver_license, password } = request.body;

    const createUserUSeCase = container.resolve(CreateUserUSeCase);

    await createUserUSeCase.execute({
      name,
      email,
      driver_license,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
