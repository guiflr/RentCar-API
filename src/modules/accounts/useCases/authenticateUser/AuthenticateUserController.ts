import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userAuthenticate = container.resolve(AuthenticateUserUseCase);

    const authentication = await userAuthenticate.execute({ email, password });

    return response.json(authentication);
  }
}

export { AuthenticateUserController };
