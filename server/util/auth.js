const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('jwtRS256.key');
function createTokenAuth(data) {
    return new Promise((resolve, reject) => {
        jwt.sign({ data }, privateKey, {}, (error, token) => {
            if (!error) {
                resolve(token);
            } else {
                reject(error);
            }
        });
    });
}
function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (error, decode) => {
            if (!error) {
                resolve(decode);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = { createTokenAuth, decodeToken };
