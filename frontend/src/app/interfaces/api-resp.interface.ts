import { RespCodes } from "@enums/resp-codes";
import { FormType } from "./auth.interface";

export interface GeneralResp {
  code: RespCodes,
  data: any,
  error: boolean,
  message: string,
  type: FormType,
  btnMsg?: string
}