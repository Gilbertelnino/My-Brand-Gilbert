import Joi from "joi";

// validation schema
export const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(8).max(25).required(),
    subtitle: Joi.string().min(8).max(50).required(),
    content: Joi.string().min(5).required(),
    author: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};
export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).max(50).required(),
  });
  return schema.validate(data);
};
export const commentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    commentContent: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// export default { postValidation, loginValidation };
