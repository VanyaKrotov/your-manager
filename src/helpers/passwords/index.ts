import { AES, enc } from "crypto-js";

export const encryptPassword = (password: string, key: string) =>
  AES.encrypt(password, key).toString();

export const decryptPassword = (password: string, key: string) =>
  AES.decrypt(password, key).toString(enc.Utf8);
