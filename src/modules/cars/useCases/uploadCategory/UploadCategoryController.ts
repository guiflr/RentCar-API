import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCategoryUseCase } from "./UploadCategoryUseCase";

class UploadCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const uploadCategoryUseCase = container.resolve(UploadCategoryUseCase);

    await uploadCategoryUseCase.execute(file);

    return response.status(201).json(file);
  }
}

export { UploadCategoryController };
