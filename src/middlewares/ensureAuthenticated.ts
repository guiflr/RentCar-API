import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { verify } from "jsonwebtoken";
import { AppError } from "../error/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const usersRepository = new UserRepository();

  const auth = request.headers.authorization;

  if (!auth) {
    throw createError(401, "Token missing");
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
      throw createError(401, "User doesn't exists");
    }

    next();
  } catch {
    throw createError(401, "Invalid token");
  }
}
