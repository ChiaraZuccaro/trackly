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
    logUserIn(req, res);
    
  } catch (error) {
    const isErrorCode = typeof Number(error) === 'number';
    if(isErrorCode) {
      const errCode = error as RespCodes;
      new ApiResponse(errCode, RegisterMessages, true).send(res);
    } 
  }
}

export async function logUserIn(req: Request, res: Response) {
  const auth = new AuthService(req);
  try {

    const data = await auth.login();
    await new ApiResponse(RespCodes.OK, LoginMessages).send(res, { ...data });

  } catch (error) {
    const isErrorCode = typeof Number(error) === 'number';
    if(isErrorCode) {
      const errCode = error as RespCodes;
      new ApiResponse(errCode, LoginMessages, true).send(res);
    }
  }
}