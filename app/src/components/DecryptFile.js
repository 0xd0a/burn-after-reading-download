import config from "../config";
import { hashSha256, hextounit8 } from "../utils/hex";

const downloadFile = async (fileId) => {
  let resp = await fetch(config.API_URL + "/downloads/" + fileId);
  return resp.blob();
};

export const getMetaData = async (fileId) => {
  let resp = await fetch(config.API_URL + "/get_info/" + fileId);
  return await resp.json();
};

const decryptFile = async (data, key, iv) => {
  return new Promise((resolve, reject) => {
    crypto.subtle
      .importKey("raw", Uint8Array.from(key), "AES-CBC", false, [
        "encrypt",
        "decrypt",
      ])
      .then((key) => crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data))
      .then((decrypted) => {
        resolve(decrypted);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export default async function DecryptFile(fileId, key) {
  try {
    // Get File Metadata
    let params = await getMetaData(fileId);
    let filename = params.filename;

    let iv = hextounit8(params.iv);
    let f = await downloadFile(fileId);
    let ab = await f.arrayBuffer();

    let decryptedFile = await decryptFile(ab, await hashSha256(key), iv);

    return { file: decryptedFile, filename: filename };
  } catch (e) {
    throw new Error("Decryption failed");
  }
}
