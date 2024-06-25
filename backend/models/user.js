'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Definir los atributos del modelo
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: true
        }
    }, {
        // Opciones del modelo
        tableName: 'users',
        timestamps: true
    });
    
    return User;
};