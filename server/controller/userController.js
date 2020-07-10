const User = require('../models/user')();
const bcrypt = require('bcrypt');
const bcryptUtil = require('../util/bcrypt')();
const saltRounds = 10;
module.exports = () => {
    return {
        signIn: async (req, res, next) => {
            const { username, password } = req.body;
            if (typeof username !== 'undefined' && typeof password !== 'undefined') {
                const result = User.signIn(username, password)
                    .then((data) => {
                        if (data) {
                            const match = 0;
                        } else {
                            res.status(401).send('Account not exited');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(401).send('Account not exited');
                    });
            } else {
                res.sendStatus(403);
            }
        },
        signUp: async (req, res, next) => {
            const payload = req.body;
            if (payload) {
                payload.password = await bcryptUtil.hashPass(payload.password).catch((error) => {
                    console.error(error);
                    res.status(403);
                });
                const result = User.signUp(payload)
                    .then((data) => {
                        const [user, created] = data;
                        if (!created) {
                            res.status(404).send('Account exited');
                        } else {
                            res.status(201).json(user);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(404).send('error');
                    });
            } else {
                res.sendStatus(403);
            }
        },
        getInfor: async (req, res, next) => {
            const { id } = req.params;
            if (id) {
                const result = User.getInfor(id)
                    .then((data) => {
                        if (data) {
                            res.status(200).json(data);
                        } else {
                            res.status(404).send('Error');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(404).send('Error');
                    });
            } else {
                res.status(403);
            }
        },
    };
};
