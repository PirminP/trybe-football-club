import * as Joi from 'joi';
import { ILogin } from '../interfaces/User';

const fieldError = 'All fields must be filled';
export const validateLogin: Joi.ObjectSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'any.required': fieldError,
    'string.empty': fieldError,
  }),
  password: Joi.string().min(10).required().messages({
    'any.required': fieldError,
    'string.empty': fieldError,
  }),
});

function validation(schema: Joi.ObjectSchema, body: ILogin) {
  const testingInput = schema.validate(body);

  if (testingInput.error) {
    const { message } = testingInput.error.details[0];
    return { message };
  }
  const data = testingInput.value;
  return { data };
}

export default validation;
