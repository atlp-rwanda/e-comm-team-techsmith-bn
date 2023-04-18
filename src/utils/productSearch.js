import Joi from 'joi';

const validateProductInput = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });
const productSchema = Joi.object({
  name: Joi.string().allow(null),
  price: Joi.number().allow(null),
  categoryIds: Joi.number().allow(null),
});
const validateInput = validateProductInput(productSchema);
export default validateInput;
