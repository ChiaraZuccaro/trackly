import { RespCodes } from "@enums/errors.enum";

export const AuthMessages: Record<RespCodes, string> = {
  [RespCodes.OK]: "Yeppiii",
  [RespCodes.CREATED]: "L'utente è stato creato con successo!",
  [RespCodes.BAD_REQUEST]: "Richiesta non valida",
  [RespCodes.UNAUTHORIZED]: "Autenticazione fallita",
  [RespCodes.NOT_FOUND]: "Qualcosa è andato storto",
  [RespCodes.CONFLICT]: "Esiste già un utente con questa email",
  [RespCodes.INTERNAL_SERVER_ERROR]: "Errore interno del server"
}