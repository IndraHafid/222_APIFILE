'use strict';

module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define('Komik', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Title tidak boleh kosong"
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Description tidak boleh kosong"
                }
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Author tidak boleh kosong"
                }
            }
        },
        imageType: DataTypes.STRING,
        imageName: DataTypes.STRING,
        imageData: DataTypes.BLOB('long'),
    }, {
        tableName: 'komiks',
    });
    return Komik;
};
