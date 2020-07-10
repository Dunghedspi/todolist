const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class user extends Model {}
    user.init(
        {
            userName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                },
                allowNull: false,
                unique: true,
            },
            role: {
                type: DataTypes.BOOLEAN,
            },
            avatar: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            fullName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        { modelName: 'user', sequelize, paranoid: true }
    );
    user.associate = (Models) => {
        user.hasMany(Models.task, {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    };
    return user;
};
