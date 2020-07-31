const jwtCustom = require('../util/auth');

const task = require('../models/task')();

module.exports = () => {
    return {
        getTask: async (req, res, next) => {
            try {
                const { data } = req.payload;
                if (data) {
                    const { id } = data;
                    const result = await task.getTask({ id });
                    res.status(200).json(result);
                }
            } catch (e) {
                res.sendStatus(404);
            }
        },
        createTask: async (req, res, next) => {
            try {
                const { data } = req.payload;
                if (data) {
                    const { id } = data;
                    const formData = req.body;
                    const dateNow = new Date();
                    const newTask = {
                        ...formData,
                        createdAt: dateNow,
                        updateAt: dateNow,
                        userId: id,
                    };
                    const result = await task.insertTask(newTask);
                    if (result) res.status(201).json(result);
                    else res.sendStatus(204);
                }
            } catch (error) {
                console.log(error + '');
                res.sendStatus(204);
            }
        },
        editTask: async (req, res, next) => {
            try {
                const { data } = req.payload;
                const formData = JSON.parse(JSON.stringify(req.body));
                const result = await task.getTaskById({ userId: data.id, id: formData.id });
                if (result) {
                    const isEdit = await task.updateTask({ formData: formData });
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            } catch (error) {
                res.sendStatus(404);
                console.log(error);
            }
        },
        deleteTask: async (req, res, next) => {
            try {
                const { data } = req.payload;
                const { id } = req.params;
                const result = await task.getTaskById({ userId: data.id, id });
                if (result) {
                    const isDelete = await task.deleteTask({ id });
                    if (isDelete) res.sendStatus(200);
                    else res.sendStatus(204);
                } else {
                    res.sendStatus(204);
                }
            } catch (error) {
                console.log(error + ' ');
                res.sendStatus(204);
            }
        },
    };
};
