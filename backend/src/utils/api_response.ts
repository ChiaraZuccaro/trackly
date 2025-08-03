import { RespCodes } from "@enums/errors.enum";
import type { Response } from "express";

export class ApiResponse {
  private code: RespCodes;
  private message: string;
  private error: boolean;

  constructor(
    code: RespCodes,
    msgCatalog: Record<RespCodes, string>,
    isError = false
  ) {
    this.code = code;
    this.message = msgCatalog[code];
    this.error = isError;
  }
  
  public async send(res: Response) {
    res.status(this.code).json({
      code: this.code,
      message: this.message,
      error: this.error
    })
  }
}