import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import "express-async-errors";

import "./database";

import "./shared/container";

import swaggerConfig from "./swagger.json";
import { router } from "./routes";
import { AppError } from "./error/AppError";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(router);

interface IError {
  status: number;
  stack: string;
  message: string;
}

app.use(
  (err: IError, request: Request, response: Response, next: NextFunction) => {
    return response.status(err.status).json({ message: err.message });
  }
);

app.listen(2323);
