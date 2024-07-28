const Joi = require('@hapi/joi');

const schemas = {
  signUp: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
    }),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
  }),

  login: Joi.object().keys({
    emailOrUsername: Joi.string().required(),
    password: Joi.string().required(),
  }),

  transaction: Joi.object().keys({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    amount: Joi.number().required(),
  }),

  complianceCheck: Joi.object().keys({
    transactionId: Joi.string().required(),
    status: Joi.string().valid('Pending', 'Approved', 'Rejected').required(),
    reasons: Joi.array().items(Joi.string()),
  }),
};

module.exports = schemas;
