import type { ErrorCodes } from "./errorCodes";

type ErrorBody = {
  error: string;
  code: ErrorCodes;
};

export class ApiError extends Error {
  body: ErrorBody;
  status: number;
  code: ErrorCodes;

  constructor(body?: ErrorBody, status?: number) {
    super("Api Error");
    super.name = "ApiError";
    this.body = body || { error: "", code: "INVALID" };
    this.status = status || 0;
    this.code = this.body.code;
  }
}
