'use strict';
module.exports = (sequelize, DataTypes) => {
    const Competition = sequelize.define('Competition', {
        // Definir los atributos del modelo
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: true
        }
    }, {
        // Opciones del modelo
        tableName: 'competitions',
        timestamps: true
    });

    // Aquí puedes definir asociaciones si es necesario
    Competition.associate = function(models) {
        Competition.hasMany(models.Score, {
            foreignKey: 'competitionId',
            as: 'scores'
        });
    };
      
    return Competition;
};