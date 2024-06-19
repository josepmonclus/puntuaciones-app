const Joi = require('joi');

const competitionValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        date: Joi.date()
            .required()
    });
    return schema.validate(data)
}

module.exports.competitionValidator = competitionValidator;