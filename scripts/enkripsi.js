require("dotenv").config({ path: "../.env" });
const CryptoJS = require("crypto-js");

/**
 * Mengubah teks yang bisa dibaca menjadi tidak bisa dibaca
 * @param {string} data
 * @returns {string}
 */
function encrypt(data) {
  return CryptoJS.AES.encrypt(data, process.env.ENCRYPT_SECRET);
}

/**
 * Mengubah teks yang terenkripsi menjadi teks yang bisa dibaca
 * @param {string} data
 * @returns {string}
 */
function decrypt(data) {
  return CryptoJS.AES.decrypt(data, process.env.ENCRYPT_SECRET);
}

let args = process.argv.slice(2);

if (!args[0]) console.log("Usage: node enkripsi.js [encrypt | decrypt] [data]");

if (args[0] === "encrypt") {
  if (args[1]) console.log(encrypt(args[1]).toString());
  else console.log("Data yang mau dienkripsi wajib diisi!");
} else if (args[0] === "decrypt") {
  if (args[1]) console.log(decrypt(args[1]).toString(CryptoJS.enc.Utf8));
  else console.log("Data enkripsi wajib diisi!");
}
