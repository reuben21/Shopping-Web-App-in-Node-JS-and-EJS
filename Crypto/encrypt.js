const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'fg8394g2t885628wydiejwght739t5';
var encrypted = '';
// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
const cipherText = (TextToEncrypt) => {
    return crypto.scrypt(password, 'salt', 24).then((err, key) => {
        if (err) throw err;
        // Then, we'll generate a random initialization vector
        return crypto.randomFill(new Uint8Array(16), (err, iv) => {
            if (err) throw err;

            // Once we have the key and iv, we can create and use the cipher...
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            cipher.write(TextToEncrypt);
            cipher.end();

            cipher.setEncoding('hex');

            cipher.on('data', (chunk) => encrypted += chunk);
            cipher.on('end', () => {
                console.log(encrypted)
                return encrypted;
            });


            return encrypted.toString();
        });
    });
}

console.log("CIP", cipherText("HELLO REUBEN"))
console.log("CIP TO ENCRYPT", encrypted)


