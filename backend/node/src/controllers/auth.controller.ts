import { RespCodes } from "@enums/errors.enum";
import { AuthService } from "@services/auth.service";
import { ApiResponse } from "@utils/api_response";
import { LoginMessages, RegisterMessages } from "@utils/messages/auth.messages";
import type { Request, Response } from "express";

export async function registerUser(req: Request, res: Response) {
  const auth = new AuthService(req);
  try {

    await auth.register();
    await new ApiResponse(RespCodes.CREATED, RegisterMessages).send(res);

  } catch (error) {
    const isError = true;
    if (typeof error === 'number' && !Number.isNaN(error)) {
      const errCode = error as RespCodes;
      new ApiResponse(errCode, LoginMessages, isError).send(res);
    } else {
      new ApiResponse(RespCodes.INTERNAL_SERVER_ERROR, LoginMessages, isError).send(res);
    }
  }
}

export async function logUserIn(req: Request, res: Response) {
  const auth = new AuthService(req);
  try {

    const data = await auth.login();
    await new ApiResponse(RespCodes.OK, LoginMessages).send(res, { ...data });

  } catch (error) {
    const isError = true;
    if (typeof error === 'number' && !Number.isNaN(error)) {
      const errCode = error as RespCodes;
      new ApiResponse(errCode, LoginMessages, isError).send(res);
    } else {
      new ApiResponse(RespCodes.INTERNAL_SERVER_ERROR, LoginMessages, isError).send(res);
    }
  }
}