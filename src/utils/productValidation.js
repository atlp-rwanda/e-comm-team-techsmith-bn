import Joi from 'joi';

const validateProductInput = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });
const productSchema = Joi.object({
  name: Joi.string().trim().required(),
  price: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
  categoryId: Joi.number().required(),
  description: Joi.string().trim().required(),
  condition: Joi.string().trim(),
  image: Joi.array()
    .items(Joi.string().trim().required())
    .min(4)
    .max(8)
    .unique(),
  expiryDate: Joi.date().iso().allow(null),
  sellerId: Joi.number(),
});
const validateInput = validateProductInput(productSchema);
export default validateInput;
