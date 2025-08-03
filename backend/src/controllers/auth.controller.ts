import { RespCodes } from "@enums/errors.enum";
import { AuthService } from "@services/auth.service";
import { ApiResponse } from "@utils/api_response";
import { AuthMessages } from "@utils/messages/auth.messages";
import type { Request, Response } from "express";

export async function registerUser(req: Request, res: Response) {
  const auth = new AuthService(req);
  try {

    await auth.register();
    await new ApiResponse(RespCodes.CREATED, AuthMessages).send(res);
    logUserIn(req, res);
    
  } catch (error) {

    const errCode = error as RespCodes;
    new ApiResponse(errCode, AuthMessages, true).send(res);

  }
}

export function logUserIn(req: Request, res: Response) {
  // const auth = new AuthService({ req, res });
  // auth.login();
}