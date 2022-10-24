export const uint8tohex = (uint8) =>
    uint8.reduce((t, x) => t + x.toString(16).padStart(2, '0'), '')


export const hextounit8 = (hexString) =>
    Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

export const padKey = (key) =>
    key.toString().slice(0, 16).padEnd(16)

export async function hashSha256(string) {
        const utf8 = new TextEncoder().encode(string)
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8)
        return new Uint8Array(hashBuffer)
      }
