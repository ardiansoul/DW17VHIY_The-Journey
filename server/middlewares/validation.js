const Joi = require("@hapi/joi");

const registerValidator = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(10).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const journeyValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    userId: Joi.number().required(),
    description: Joi.string().min(20).required(),
  });
  return schema.validate(data);
};

const bookmarkValidator = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    journeyId: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
module.exports.journeyValidator = journeyValidator;
module.exports.bookmarkValidator = bookmarkValidator;
