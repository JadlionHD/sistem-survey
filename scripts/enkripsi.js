// File ini digunakan untuk melakukan encrypt/decrypt text dengan cara manual.
// Biasanya file ini digunakan untuk melakukan testing pada struktur password di tabel database.
// Untuk menggunakan file ini, maka usagenya seperti dibawah ini:
// Usage: node enkripsi.js [encrypt | decrypt] [data]
// Contoh: node enkripsi.js encrypt test123

require("dotenv").config({ path: "../.env" });
const CryptoJS = require("crypto-js");

/**
 * Mengubah teks yang bisa dibaca menjadi tidak bisa dibaca
 * @param {string} data
 * @returns {string}
 */
function encrypt(data) {
  return CryptoJS.AES.encrypt(data, process.env.ENCRYPT_SECRET).toString();
}

/**
 * Mengubah teks yang terenkripsi menjadi teks yang bisa dibaca
 * @param {string} data
 * @returns {string}
 */
function decrypt(data) {
  return CryptoJS.AES.decrypt(data, process.env.ENCRYPT_SECRET).toString(CryptoJS.enc.Utf8);
}

let args = process.argv.slice(2);

if (!args[0]) console.log("Usage: node enkripsi.js [encrypt | decrypt] [data]");

if (args[0] === "encrypt") {
  if (args[1]) console.log(encrypt(args[1]).toString());
  else console.log("Data yang mau dienkripsi wajib diisi!");
} else if (args[0] === "decrypt") {
  if (args[1]) console.log(decrypt(args[1]));
  else console.log("Data enkripsi wajib diisi!");
}
