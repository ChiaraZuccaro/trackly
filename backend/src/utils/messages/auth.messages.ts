import { RespCodes } from "@enums/errors.enum";

export const RegisterMessages: Partial<Record<RespCodes, string>> = {
  [RespCodes.CREATED]: "L'utente è stato creato con successo!",
  [RespCodes.BAD_REQUEST]: "Richiesta non valida",
  [RespCodes.UNAUTHORIZED]: "Autenticazione fallita",
  [RespCodes.NOT_FOUND]: "Qualcosa è andato storto",
  [RespCodes.CONFLICT]: "Esiste già un utente con questa email",
  [RespCodes.INTERNAL_SERVER_ERROR]: "Errore interno del server"
}

export const LoginMessages: Partial<Record<RespCodes, string>> = {
  [RespCodes.OK]: "Login eseguito con successo!!",
  [RespCodes.NOT_FOUND]: "Utente non trovato!",
  [RespCodes.BAD_REQUEST]: "Credenziali errate!",
  [RespCodes.UNAUTHORIZED]: "Password non valida!",
}