'use strict';
module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('Score', {
        // Definir los atributos del modelo
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        team: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        competitionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'competitions',
                key: 'id'
            }
        }
    }, {
        // Opciones del modelo
        tableName: 'scores',
        timestamps: true
    });

    // Aquí puedes definir asociaciones si es necesario
    Score.associate = function(models) {
        Score.belongsTo(models.Competition, {
            foreignKey: 'competitionId',
            as: 'competition'
        });
    };

    return Score;
};