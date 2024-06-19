const Joi = require('joi');

const scoreValidator = (data) => {
    const schema = Joi.object({
        team: Joi.string()
            .required(),
        score: Joi.number()
            .required(),
        competitionId: Joi.number()
            .integer()
            .required()
    });
    return schema.validate(data)
}

const scoreUpdateValidator = (data) => {
    const schema = Joi.object({
        team: Joi.string()
            .required(),
        score: Joi.number()
            .required()
    });
    return schema.validate(data)
}

module.exports.scoreValidator = scoreValidator;
module.exports.scoreUpdateValidator = scoreUpdateValidator;