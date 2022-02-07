class AppError extends Error {
  readonly code: number;
  readonly message: string;

  constructor(message: string, code = 400) {
    super();
    this.message = message;
    this.code = code;
  }
}

export { AppError };
