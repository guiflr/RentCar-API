import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

const usersRepository = new UserRepository();

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) {
    throw new Error("Token missing");
  }

  const [, token] = auth.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "d41d8cd98f00b204e9800998ecf8427e"
    ) as IPayload;

    console.log(user_id);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User doesn't exists");
    }

    next();
  } catch {
    throw new Error("Invalid token");
  }
}
