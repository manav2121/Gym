const Joi = require("joi");

const memberValidationSchema = Joi.object({

  name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  phone: Joi.string()
    .min(10)
    .max(15)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  plan: Joi.string()
    .valid(
      "1 Month",
      "3 Months",
      "6 Months",
      "1 Year"
    )
    .required(),

  startDate: Joi.date()
    .required(),

  expiryDate: Joi.date()
    .required(),

  paymentAmount: Joi.number()
    .min(0)
    .required(),

  paymentStatus: Joi.string()
    .valid(
      "Paid",
      "Pending"
    )
    .required(),

});

module.exports =
  memberValidationSchema;