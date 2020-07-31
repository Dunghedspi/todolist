'use strict';
const { Op } = require('sequelize');
const Models = require('../../database/models');
const User = Models.user;
module.exports = () => {
    return {
        signIn: async (username) => {
            const result = await Models.user
                .findOne({
                    attributes: ['id', 'role', 'password'],
                    where: {
                        userName: username,
                    },
                })
                .then((data) => data)
                .catch((error) => {
                    throw new Error(error);
                });
            return result;
        },
        signUp: async (payload) => {
            let { userName, email } = payload;
            let date = new Date();
            payload.createdAt = payload.updatedAt = date;
            const result = Models.user
                .findOrCreate({
                    attributes: ['id', 'role'],
                    where: {
                        [Op.or]: {
                            userName: {
                                [Op.eq]: userName,
                            },
                            email: {
                                [Op.eq]: email,
                            },
                        },
                    },
                    defaults: {
                        ...payload,
                    },
                })
                .then((data) => data)
                .catch((error) => {
                    return error;
                });
            return result;
        },
        getInfor: async (id) => {
            const result = await Models.user
                .findByPk(id, {
                    attributes: ['userName', 'avatar', 'phone', 'email', 'fullName'],
                })
                .then((data) => data)
                .catch((error) => {
                    throw new Error(error + '');
                });
            return result;
        },
    };
};
