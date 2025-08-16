import { RespCodes } from "@enums/resp-codes";

export interface GeneralResp {
  code: RespCodes,
  data: any,
  error: boolean,
  message: string
}