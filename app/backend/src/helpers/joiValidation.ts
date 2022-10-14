import * as Joi from 'joi';
import { ILogin } from '../interfaces/User';
import IMatch, { IScore } from '../interfaces/Match';

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

export const validateMatch: Joi.ObjectSchema = Joi.object().keys({
  homeTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeam: Joi.number().required(),
  awayTeamGoals: Joi.number().min(0).required(),
  inProgress: Joi.boolean(),
});

export const validateScore: Joi.ObjectSchema = Joi.object().keys({
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
});

function validation(schema: Joi.ObjectSchema, body: ILogin | IMatch | IScore) {
  const testingInput = schema.validate(body);

  if (testingInput.error) {
    const { message } = testingInput.error.details[0];
    return { message };
  }
  const data = testingInput.value;
  return { data };
}

export default validation;
