import Joi from "joi";

export const profileValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().min(4).required(),
    jobRole: Joi.string().min(3).required(),
    department: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};
