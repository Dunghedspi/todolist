'use strict';
const { Op } = require('sequelize');
const Models = require('../../database/models');
function taskModel(params) {
    return {
        getTask: async (options) => {
            const { id } = options;
            try {
                const result = await Models.task.findAll({
                    where: { userId: id },
                });
                return result;
            } catch (error) {
                throw error + '';
            }
        },
        insertTask: async (payload) => {
            try {
                const result = await Models.task.create(payload);
                return result;
            } catch (error) {
                console.log(error);
                throw error + '';
            }
        },
        getTaskById: async (options) => {
            const { id, userId } = options;
            try {
                const result = await Models.task.findOne({
                    where: {
                        id,
                        userId,
                    },
                });
                return result;
            } catch (error) {
                throw error + '';
            }
        },
        updateTask: async (payload) => {
            const { formData } = payload;
            try {
                const result = await Models.task.update(formData, {
                    where: {
                        id: formData.id,
                    },
                });
                return result;
            } catch (error) {
                throw error;
            }
        },
        deleteTask: async (payload) => {
            const { id } = payload;
            try {
                const result = await Models.task.destroy({ where: { id } });
                return result;
            } catch (error) {
                throw error + '';
            }
        },
        getTaskByTime: async (time) => {
            try {
                const result = await Models.task.findAll({
                    where: {
                        timeStart: time,
                        status: 0,
                    },
                    include: [
                        {
                            model: Models.user,
                            required: true,
                            attributes: ['email', 'fullName'],
                        },
                    ],
                    attributes: ['title', 'description', 'timeStart'],
                });

                return result;
            } catch (error) {
                throw error + '';
            }
        },
    };
}
module.exports = taskModel;
