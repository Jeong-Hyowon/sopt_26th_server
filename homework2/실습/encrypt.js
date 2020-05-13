const crypto = require('crypto');

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512' , (err, deriveKey) => {
        if (err) throw err;
        const hashed = deriveKey.toString('hex');
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);
    });
}

const password = 'fl0wer';
const salt = crypto.randomBytes(32).toString('hex');
encrypt(salt, password);