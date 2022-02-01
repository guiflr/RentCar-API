import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRouter = Router();

const createUsersController = new CreateUserController();

usersRouter.post("/", createUsersController.handle);

export { usersRouter };
