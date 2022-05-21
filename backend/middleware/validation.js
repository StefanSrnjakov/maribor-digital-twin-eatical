const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required(),
        telephone: Joi.string().min(6).required()
    });

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next();
}

//Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next();
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;