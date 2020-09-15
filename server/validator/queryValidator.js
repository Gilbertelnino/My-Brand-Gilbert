import Joi from "joi";

export const queriesValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    message: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
