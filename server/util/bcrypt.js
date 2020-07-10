const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = () => {
    return {
        hashPass: (password) => {
            return new Promise((resolve, reject) => {
                bcrypt.hash(password, saltRounds, (error, hash) => {
                    if (!error) {
                        return resolve(hash);
                    } else {
                        return reject(error);
                    }
                });
            });
        },
        checkPass: (password, hash) => {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, hash, (error, isEq) => {
                    if (!error) {
                        return resolve(isEq);
                    } else {
                        return reject(error);
                    }
                });
            });
        },
    };
};
