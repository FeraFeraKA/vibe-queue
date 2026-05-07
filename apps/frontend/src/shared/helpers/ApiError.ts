export class ApiError extends Error {
  status: number;
  name: string;
  error: string;

  constructor(message: string, status: number, error: string = "Nest failure") {
    super(message);
    this.error = error;
    this.name = "ApiError";
    this.status = status;
  }
}
