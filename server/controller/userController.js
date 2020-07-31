const User = require('../models/user')();
const bcryptUtil = require('../util/bcrypt')();
const jwtCustom = require('../util/auth');
module.exports = () => {
    return {
        signIn: async (req, res, next) => {
            const { userName, password } = req.body;
            if (typeof userName !== 'undefined' && typeof password !== 'undefined') {
                /*Ham util check UserName vs password*/
                try {
                    //lay du lieu trong database doi voi userName
                    const result = await User.signIn(userName);
                    if (result) {
                        // checkPass
                        const matchPass = await bcryptUtil.checkPass(password, result.password);
                        if (matchPass) {
                            //tao token dang nhap
                            const token = await jwtCustom.createTokenAuth({
                                id: result.id,
                                role: result.role,
                            });
                            res.status(200).json(token);
                        } else {
                            res.sendStatus(403);
                        }
                    } else {
                        res.status(403).send('Account not exited');
                    }
                } catch (error) {
                    res.sendStatus(403);
                }
            } else {
                res.sendStatus(403);
            }
        },
        signUp: async (req, res, next) => {
            const payload = req.body;
            if (payload) {
                try {
                    payload.password = await bcryptUtil.hashPass(payload.password);
                    const result = User.signUp(payload).then((data) => {
                        const [user, created] = data;
                        if (!created) {
                            res.sendStatus(404).send('Account exited');
                        } else {
                            res.sendStatus(201);
                        }
                    });
                } catch (error) {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        },
        getInfor: async (req, res, next) => {
            const { id } = req.payload.data;
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
