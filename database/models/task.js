const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class task extends Model {}
    task.init(
        {
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(200),
            },
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                validate: {
                    max: 2,
                    min: 0,
                },
            },
            timeStart: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: true,
                },
            },
        },
        { modelName: 'task', sequelize, paranoid: true }
    );
    task.associate = (Models) => {
        task.belongsTo(Models.user, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
        });
    };
    return task;
};
