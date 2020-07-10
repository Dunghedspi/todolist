const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class sildes extends Model {}
    sildes.init(
        {
            image_url: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.STRING,
            },
            link: {
                type: DataTypes.STRING,
            },
        },
        { modelName: 'sildes', sequelize, paranoid: true }
    );
    return sildes;
};
