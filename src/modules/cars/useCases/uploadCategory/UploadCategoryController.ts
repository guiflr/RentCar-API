import { Request, Response } from "express";

import { UploadCategoryUseCase } from "./UploadCategoryUseCase";

class UploadCategoryController {
  constructor(private uploadCategoryUseCase: UploadCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    this.uploadCategoryUseCase.execute(file);

    return response.json(file);
  }
}

export { UploadCategoryController };
