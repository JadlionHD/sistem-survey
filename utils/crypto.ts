import CryptoJS from "crypto-js";

export function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, process.env.ENCRYPT_SECRET!).toString();
}
export function decrypt(data: string): string {
  return CryptoJS.AES.decrypt(data, process.env.ENCRYPT_SECRET!).toString(CryptoJS.enc.Utf8);
}

// U2FsdGVkX191loovFHu2d4z7NMHlPM+8LsuP0yk26GI=
// U2FsdGVkX1/7sB4NKjqVCUuBCkkbjBKb1ZNXcNT+2LA=
// U2FsdGVkX1/hPB2Xd0kigQJi03YQ2ILMer+CZFeKUN4=
