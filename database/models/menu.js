const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class menu extends Model {}
    menu.init(
        {
            name: {
                type: DataTypes.STRING,
            },
            link: {
                type: DataTypes.STRING,
            },
        },
        {
            modelName: 'menu',
            sequelize,
            paranoid: true,
        }
    );
    return menu;
};
