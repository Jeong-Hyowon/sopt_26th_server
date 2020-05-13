const fs = require('fs');
const crypto = require('crypto');

const title = 'password'
const password='sopt26th'

fs.writeFile(`${title}.txt`, password, (err, password) => {
    if (err) return console.log(err.messae);
    console.log(`${title}가 생성되었습니다!`);
})

fs.readFile(`${title}.txt`, (err, password) => {
    if (err) return console.log (err.message);
    console.log(`${title} : "${password}"\n`);
    const salt = crypto.randomBytes(32).toString('hex');
    encrypt(salt, password);
});

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512' , (err, deriveKey) => {
        if (err) throw err;
        const title2='hashed'
        const hashed = deriveKey.toString('hex');

        fs.writeFile(`${title2}.txt`, hashed, (err, hashed) => {
            if (err) return console.log(err.messae);
            console.log(`${title2}가 생성되었습니다!`);
        })
    });
}

//hashed.txt 에 2b58220a9caf3353e571b17a368085e21e1bfdfd93b3acee3cc9450111fbe69c 로 저장됨