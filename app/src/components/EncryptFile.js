const fileEncrypt = (file, key, iv) => {
    return new Promise((resolve) => {
        let reader = new FileReader();
        let encryptedReader
        reader.onload = function (e) {
            let data = e.target.result

            encryptedReader = crypto.subtle.importKey("raw", Uint8Array.from(key), 'AES-CBC', false, ['encrypt', 'decrypt'])
                .then(key => crypto.subtle.encrypt({ 'name': 'AES-CBC', iv }, key, data))
                .then(encrypted => {
                    resolve(encrypted)
                })
                .catch(console.error);
        }
        reader.readAsArrayBuffer(file);
    })
}

export default async (file, key)=>{
    let iv = crypto.getRandomValues(new Uint8Array(16))
    const encryptedFile = await fileEncrypt(file, key, iv)

    return {encryptedFile: encryptedFile,
            iv: iv}
}