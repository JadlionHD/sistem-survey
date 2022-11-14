import CryptoJS from "crypto-js";

export function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, process.env.ENCRYPT_SECRET!).toString();
}
export function decrypt(data: string): string {
  return CryptoJS.AES.decrypt(data, process.env.ENCRYPT_SECRET!).toString(CryptoJS.enc.Utf8);
}
