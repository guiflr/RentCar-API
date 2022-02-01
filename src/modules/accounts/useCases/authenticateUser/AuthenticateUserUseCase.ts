import { injectable, inject } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IReponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IReponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password is incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password is incorrect");
    }

    const token = sign({}, "d41d8cd98f00b204e9800998ecf8427e", {
      subject: user.id,
      expiresIn: "1d",
    });

    const userResponse: IReponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };

    return userResponse;
  }
}

export { AuthenticateUserUseCase };
